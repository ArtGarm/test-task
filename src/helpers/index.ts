import {TournamentInTable} from "../interfaces";
const saveKey = 'tournament_stack'

const getFromLocalStorage = (): TournamentInTable[] => {
  return JSON.parse(localStorage.getItem(saveKey)) || []
}

const saveToLocalStorage = (single): void => {
  const all = getFromLocalStorage()
  localStorage.setItem(saveKey, JSON.stringify([...all, { ...single, id: all.length + 1 }]))
}

const getSingleFromLocalStorage = (id: number): TournamentInTable => {
  const all = getFromLocalStorage()
  return all?.find(it => it.id === id) || null;
}

const updateSingleFromLocalStorage = (single): void => {
  const all = getFromLocalStorage()
  localStorage.setItem('tournament_stack', JSON.stringify(all.map(it => it.id === single.id ? single : it )))
}

export default { saveToLocalStorage, getFromLocalStorage, getSingleFromLocalStorage, updateSingleFromLocalStorage }