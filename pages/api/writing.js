const vwtApiKey =  `b7761920-e574-11ec-a1cb-e9737f42ef97`;

const getResult = `https://console.virtualwritingtutor.com/console/essay/test-feedback/json`
const getAllQuestions = `https://console.virtualwritingtutor.com/console/essay/test-list/ielts`
const getQuestionDetails = (link) => `https://console.virtualwritingtutor.com/console/essay/test-info/${link}`
const answer = (test_link, text) => ({test_link, text})

export default function handler(req, res) {
  console.log(req.query);

  const {query} = req;

  const action = 'GETALL';

  if(action === 'GETALL'){
    fetch(getAllQuestions, {headers: {vwtApiKey}, method: 'GET'})
        .then(r => res.status(200).json(r))
        .catch(e => res.status(404).json(e.message))
  } else if(action === 'GETINFO') {
    var {link} = query.data
    fetch(getQuestionDetails, {headers: {vwtApiKey}, method: 'GET'})
    .then(r => res.status(200).json(JSON.parse(r)))
    .catch(e => res.status(404).json(JSON.stringify(e)))
  } else if(action === 'GETRESULT') {
    var {link, text} = query.data
    fetch(getResult, {method: 'POST', headers: {vwtApiKey}, body:answer(link,text)})
        .then(r => res.status(200).json(JSON.parse(r)))
        .catch(e => res.status(404).json(JSON.stringify(e)))
  }else{
    res.status(404);
    
  }
}
