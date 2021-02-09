import React, { Fragment, useState } from 'react';
import './App.css';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { words } from './words'
import Grid from '@material-ui/core/Grid'

const menuSyllables = [
  { value : 'oli', label : 'oli/olli/oly/olly' },
  { value : 'eli', label : 'eli/elli/ely/elly' },
  { value : 'ali', label : 'ali/alli/aly/ally' },
  { value : 'ole', label : 'ole/olle/aule/aulle' }
]

const formattedWords = Object.entries(words[menuSyllables[0].value])

const highlightSyllable = (word, syllable) => {
  const splitedWord = word.split(syllable)
  return (<>{splitedWord[0]}<span className="hightlight">{syllable}</span>{splitedWord[1]}</>)
}

const accentSyllable = (word, syllable, altSyllables) => {
  let result = syllable
  if(altSyllables) {
    altSyllables.forEach(element => {
      if(word.includes(element)) {
        result = element
      }
    })
  }
  return result
}

const renderWords = (common, proper, syllable, altSyllables) => {
  const commonList = common ? <> { 
    common.map(cw => 
      <div className="word" key={cw} > { 
          highlightSyllable(cw, accentSyllable(cw, syllable, altSyllables)) 
        } </div>) 
    } </> : <></>
  const properList = proper ? <> { 
    proper.map(pw => <div className="properName" key={pw}> { highlightSyllable(pw, accentSyllable(pw, syllable, altSyllables)) } </div>) 
    } </> : <></>
  return (
    <Fragment>
      <div className="wordsList">
        { commonList }
        { properList }
      </div>
    </Fragment>
  )
}

const GridSelectedWords = props => {
  return (
    <Grid container className="gridBlockList" spacing={3}>
      { props.selectedWords.map((o,i) =>
        <>
          <Grid item xs={6} className="gridWordsBlock" key={o+i}>
            <div className="legendSyllable">{o[0]}</div>
            <div>{ renderWords(o[1].common, o[1].proper, o[0], o[1].alt) }</div>
          </Grid>
        </>) 
      }
    </Grid>)
}

function App() {
  let [selectedSyllable, updateSyllable] = useState(menuSyllables[0])
  let [selectedWords, updateSelectedWords] = useState(formattedWords)

  const handleSelectedSyllable = (event) => {
    const syllable = event.value
    updateSyllable(syllable)
    const newWords = Object.entries(words[syllable])
    updateSelectedWords([...newWords])
  }

  return (
    <div className="App">
      <div className='leftMenu'>
        <div className="syllableControl">
          <div className='labelTitle'>Syllabe</div>
          <Dropdown options={menuSyllables} value={selectedSyllable}
            controlClassName='dropdown'
            className='dropdownroot'
            onChange={handleSelectedSyllable} placeholder="Select an option" />
          <div className='rmq'>NB : ces listes ne sont pas exhaustives</div>
        </div>
        
        <span className="separator"></span>
        <div className="externalContent">
          <div className='labelTitle'>Liens externes</div>
          <a href="http://lexique.org">lexique.org</a>
        </div>
      </div>
      <div className="wordBoard">
        <div className="legend">
          <span className="legendElement">Noms communs, verbes, adjectifs, adverbes</span>
          <span className="legendElement properName">Noms propres</span>
        </div>

        {/* <div className="wordsBlockList">
          { selectedWords.map((o,i) =>
            <>
              <div className="wordsBlock" key={o+i}>
                <div className="legendSyllable">{o[0]}</div>
                <div>{ renderWords(o[1].common, o[1].proper, o[0], o[1].alt) }</div>
              </div>
            </>) 
          }
        </div> */}

      <GridSelectedWords selectedWords={selectedWords}/>

      </div>
      <div>
        <table>
          
        </table>
      </div>
    </div>
  );
}

export default App;
