import apiUrl from "./ApiConfig";

const Modes = () => {
  if(apiUrl==="http://cyapi.chipyab.ir"){
    const modeChip='Chipyab'
    return modeChip
  }else if(apiUrl==="http://sapi.sanecomputer.com"){
    const modeSane="SaneComputer"
    return modeSane
  }
}

export default Modes 