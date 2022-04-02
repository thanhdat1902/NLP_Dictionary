import axios from 'axios';

const getSentenceOrder = (id) => {
    return id.substring(2,id.length-2);
}
const DataUtils = () => {
    const getListSentence = () => {
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
                    if(currentIdx!=0) {
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
            console.log(sentenceArray)
            return sentenceArray;

        })
        .catch(err => {
            console.log(err);
        })
    }

    return {
        getListSentence: getListSentence
    }
}
export default DataUtils();