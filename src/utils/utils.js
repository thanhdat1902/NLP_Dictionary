import axios from 'axios';

const getSentenceOrder = (id) => {
    return id.substring(2,id.length-2);
}
const processWord = (word) => {
    const arrWord = word.toLowerCase().split(" ");
    if(arrWord.length > 1) return '';
    return arrWord[0];
}
const handleItemOff = (off) => {
    const offArr = off.split(",");
    if(offArr[0] === '-') return [-1,-1];
    return [offArr[0]-1, offArr[offArr.length-1]-1];
}

const processPhrase = (phrase) => {
    return phrase.toLowerCase().split(" ");
}

const handleMatchSourceArr = (sourceArr, sentenceId, item) => {
    for(let s of sourceArr) {
        if(s.id === sentenceId) {
            const wordSentence = s.sentence.split(" ");
            let left = '';
            let right = '';
            let isLeft = true;
            for(let i of wordSentence) {
                if(i === item.word) {
                    isLeft = false;
                    continue;
                }
                if(isLeft) {
                    left+=i+" ";
                } else {
                    right+=i+" ";
                }
            }
            return {
                left: left,
                right: right,
                key: item.word,
                id: s.id
            }
        }
    }
}
const handleMatchTargetArr = (targetArr, sentenceId, item) => {
    const [min, max] = handleItemOff(item.offset);
    for(let s of targetArr) {
        const wordSentence = s.sentence.split(" ");
        let left = '';
        let right = '';
        let key = '';
        if(s.id === sentenceId) {
            if(min!==-1) {
                for(let i=0; i< wordSentence.length; i++) {
                    if(i<min) {
                        left+=wordSentence[i]+ " ";
                    } else if(i>=min && i<=max) {
                        key+=wordSentence[i]+ " ";
                    } else {
                        right+=wordSentence[i]+ " ";
                    }
                }
            } else {
                right+= s.sentence;
            }
            return {
                left: left,
                right: right,
                key: key,
                id: s.id
            }
        }
    }
}

const handlePhraseSourceArr = (sourceArr, sentenceId, arrayWordsFromPhrase) => {
    const beginPhrase = arrayWordsFromPhrase[0];
    const endPhrase = arrayWordsFromPhrase[arrayWordsFromPhrase.length-1];
    for (let s of sourceArr) {
        if (s.id === sentenceId) {
            const wordSentence = s.sentence.split(" ");
            let left = '';
            let right = '';
            let isLeft = true;
            let isRight = false;
            for (let i of wordSentence) {
                if (i.toLowerCase() === beginPhrase && i.toLowerCase() !== endPhrase) {
                    isLeft = false;
                    continue;
                } else if (i.toLowerCase() === beginPhrase && i.toLowerCase() === endPhrase) {
                    isLeft = false;
                    isRight = true;
                    continue;
                } else if (i.toLowerCase() === endPhrase) {
                    isRight = true;
                    continue;
                }
                if (isLeft) {
                    left += i + " ";
                }
                if (isRight) {
                    right += i + " ";
                }
            }
            let keyReturn = "";
            for (let word of arrayWordsFromPhrase) {
                keyReturn += word + " ";
            }
            return {
                left: left,
                right: right,
                key: keyReturn,
                id: s.id
            }
        }
    }
}
const handlePhraseTargetArr = (targetArr, sentenceId, listMatchItems) => {
    let minPos = 100;
    let maxPos = -1;
    let left = "";
    let right = "";
    let key = "";
    for (let s of targetArr) {
        if (s.id === sentenceId) {
            for (let item of listMatchItems) {
                let indexes = item.offset.split(',');
                for (let index of indexes) {
                    if (index !== "-") {
                        if (parseInt(index) > parseInt(maxPos)) {
                            maxPos = index;
                        }
                        if (parseInt(index) < parseInt(minPos)) {
                            minPos = index;
                        }
                    }
                }
            }
            if (minPos === 100 && maxPos === -1) {
                right += s.sentence;
            } else {
                let arraySentence = s.sentence.split(' ');
                for (let i = 0; i < arraySentence.length; i++) {
                    if (i < minPos-1) {
                        left += arraySentence[i] + " ";
                    } else if (i >= minPos - 1 && i <= maxPos - 1) {
                        key += arraySentence[i] + " ";
                    } else {
                        right += arraySentence[i] + " ";
                    }
                }
            }
            return {
                left: left,
                right: right,
                key: key,
                id: s.id
            }
        }
    }
}
const DataUtils = () => {
    const getListVNSentence = () => {
        return axios.get('data/vn.json')
        .then(res => {
            const sentenceArray = [];
            let currentSentence = "";
            let currentIdx = 0;
            let sentenceOrder;
            res.data.map(item => {
                if(parseInt(getSentenceOrder(item.id)) === currentIdx) {
                    currentSentence+= " " + item.word;
                    sentenceOrder = getSentenceOrder(item.id);
                } else {
                    if(currentIdx!==0) {
                        sentenceArray.push({
                            id: sentenceOrder,
                            sentence: currentSentence
                        })
                    }
                    currentIdx++;
                    currentSentence = "";
                    currentSentence+= item.word;
                }

            })
            return sentenceArray;

        })
        .catch(err => {
            console.log(err);
        })

    }
    const getListENSentence = () => {
        return axios.get('data/en.json')
        .then(res => {
            const sentenceArray = [];
            let currentSentence = "";
            let currentIdx = 0;
            let sentenceOrder;
            res.data.map(item => {
                if(parseInt(getSentenceOrder(item.id)) === currentIdx) {
                    currentSentence+= " " + item.word;
                    sentenceOrder = getSentenceOrder(item.id);
                } else {
                    if(currentIdx!==0) {
                        sentenceArray.push({
                            id: sentenceOrder,
                            sentence: currentSentence
                        })
                    }
                    currentIdx++;
                    currentSentence = "";
                    currentSentence+= item.word;
                }
            })
            return sentenceArray;
        })
        .catch(err => {
            console.log(err);
        })
    }
    const searchByMatch = (currentLg, word, VNArr, ENArr ) => {
        const dataFile = currentLg === "VN" ? "data/vn.json": "data/en.json";
        const sourceArr = currentLg === "VN" ? VNArr: ENArr;
        const targetArr = currentLg === "VN" ? ENArr: VNArr;
        const result = {
            Src: [],
            Tar: []
        };
        let currentId = '';
        return axios.get(dataFile)
        .then(res => {
            res.data.map(item => {
                if(item.word === processWord(word) && item.id!==currentId) {
                    currentId = item.id;
                    let objectSrc = handleMatchSourceArr(sourceArr, getSentenceOrder(item.id), item);
                    let objectTarget = handleMatchTargetArr(targetArr, getSentenceOrder(item.id), item);
                    result.Src.push(objectSrc);
                    result.Tar.push(objectTarget);
                }
            });
            return result;
        })
        // { Src: [{id, left,right,key}] , Tar:[{id, left,right,key}] }
        .catch(err => console.log(err));
    }

    const searchByPhrase = (currentLg, phrase, VNArr, ENArr ) => {
        const dataFile = currentLg === "VN" ? "data/vn.json" : "data/en.json";
        const sourceArr = currentLg === "VN" ? VNArr : ENArr;
        const targetArr = currentLg === "VN" ? ENArr : VNArr;
        const result = {
            Src: [],
            Tar: []
        };
        return axios.get(dataFile)
        .then(res => {
            const arrayWordsFromPhrase = processPhrase(phrase);
            const phraseLength = arrayWordsFromPhrase.length;
            for(let i = 0; i < res.data.length; i++) {
                let tmp = i;
                let item = res.data[tmp];
                let matchPhrase = true;
                // check if phrase input matches with phrase in sentence.
                const listMatchItems = [];
                if (item.word.toLowerCase() === arrayWordsFromPhrase[0]) {
                    listMatchItems.push(item);
                    const sentenceId = getSentenceOrder(item.id);
                    let index = 0;
                    while (index !== phraseLength - 1) {
                        let nextItem = res.data[++tmp];
                        if (nextItem.word !== arrayWordsFromPhrase[++index] ||
                            getSentenceOrder(nextItem.id) !== sentenceId) {
                            matchPhrase = false;
                            break;
                        } else {
                            listMatchItems.push(nextItem);
                        }
                    }
                } else {
                    matchPhrase = false;
                }

                //if match
                if (matchPhrase) {
                    let objectSrc = handlePhraseSourceArr(sourceArr, getSentenceOrder(item.id), arrayWordsFromPhrase);
                    let objectTarget = handlePhraseTargetArr(targetArr, getSentenceOrder(item.id), listMatchItems);
                    result.Src.push(objectSrc);
                    result.Tar.push(objectTarget);
                }
            }
            return result;
        })
        // { Src: [{id, left,right,key}] , Tar:[{id, left,right,key}] }
        .catch(err => console.log(err));
    }


    const getStatsDict = (jsonPath)  => {
        let dict = {};
        let totalCount = 0;
        return axios.get(jsonPath)
        .then(res => {
            res.data.map(item => {
                
                dict[item.word] = dict[item.word] ? dict[item.word] + 1 : 1;
                totalCount = totalCount + 1;
            });
    
            var result = {dict: dict, totalCount: totalCount};
            return result;
    
        })
        .catch(err => {
            console.log(err);
        })
    }



    const getStatsData = (tmpData)  => {
        let result =[];
        for (var key in tmpData.dict)
            
            result.push(statHandle(key, tmpData.dict[key], tmpData.totalCount));
        //[{word, count ,percentage , -log(n/N)}]
        return result;
    }

    const statHandle = (word, count, totalCount) =>{
        let percentage = count / totalCount;
        let logPercent = -Math.log(percentage);
        return {word: word, 
            count: count, 
            percentage: percentage, 
            logPercent: logPercent};
    }

    const searchStats = (key, sortBy, statsData) =>{
        let lowercasedKey = key.toLowerCase();
        let result = [];
        for (let item of statsData){
            if (item.word.toLowerCase().includes(lowercasedKey))
            {
                result.push(item);
            }
        }

        if (sortBy === "alphabet")
            result.sort(function(a, b){
                if (a.word > b.word)
                    return 1;
                if (a.word < b.word)
                    return -1;
                return 0;
            })
        
        if (sortBy === "popularity")
            result.sort(function(a, b){ return a.count - b.count});
        
        return result;
    }
    return {
        getListVNSentence: getListVNSentence,
        getListENSentence: getListENSentence,
        searchByMatch: searchByMatch,
        searchByPhrase: searchByPhrase,
        getStatsData: getStatsData,
        getStatsDict: getStatsDict,
        searchStats: searchStats
    }
}
export default DataUtils();
