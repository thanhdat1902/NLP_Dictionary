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
    console.log(targetArr)
    console.log(sentenceId)
    console.log(listMatchItems)
    let minPos = 100;
    let maxPos = -1;
    let left = "";
    let right = "";
    let key = "";
    for (let s of targetArr) {
        if (s.id === sentenceId) {
            for (let item of listMatchItems) {
                let indexes = item.offset.split(',');
                // console.log(indexes)
                for (let index of indexes) {
                    if (index !== "-") {
                        if (parseInt(index) > parseInt(maxPos)) {
                            maxPos = index;
                        }
                        if (parseInt(index) < parseInt(minPos)) {
                            minPos = index;
                        }
                        // console.log("index: " + index)
                        // console.log("maxPos: " + maxPos)
                        // console.log("minPos: " + minPos)
                    }
                }
            }
            // console.log(minPos)
            // console.log(maxPos)
            if (minPos === 100 && maxPos === -1) {
                //if no phrase in target language match
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
                    // console.log("Here")
                    listMatchItems.push(item);
                    const sentenceId = getSentenceOrder(item.id);
                    let index = 0;
                    while (index !== phraseLength - 1) {
                        let nextItem = res.data[++tmp];
                        if (nextItem.word !== arrayWordsFromPhrase[++index] ||
                            getSentenceOrder(nextItem.id) !== sentenceId) {
                            // console.log("Wrong phrase")
                            matchPhrase = false;
                            break;
                        } else {
                            listMatchItems.push(nextItem);
                        }
                    }
                    // console.log(listMatchItems)
                    // console.log(matchPhrase)
                } else {
                    matchPhrase = false;
                }

                //if match
                if (matchPhrase) {
                    // console.log("Match")
                    let objectSrc = handlePhraseSourceArr(sourceArr, getSentenceOrder(item.id), arrayWordsFromPhrase);
                    // console.log(objectSrc);
                    let objectTarget = handlePhraseTargetArr(targetArr, getSentenceOrder(item.id), listMatchItems);
                    // console.log(objectTarget);
                    result.Src.push(objectSrc);
                    result.Tar.push(objectTarget);
                }
            }
            return result;
        })
        // { Src: [{id, left,right,key}] , Tar:[{id, left,right,key}] }
        .catch(err => console.log(err));
    }

    return {
        getListVNSentence: getListVNSentence,
        getListENSentence: getListENSentence,
        searchByMatch: searchByMatch,
        searchByPhrase: searchByPhrase
    }
}
export default DataUtils();
