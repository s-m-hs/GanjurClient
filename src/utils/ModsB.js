import apiUrl from "./ApiConfig";

const mode = {
  mode1: apiUrl === "https://cyapi.chipyab.com" ? "Chipyab" : '',
  mode2: apiUrl === "https://sapi.sanecomputer.com" ? "SaneComputer" : '',
};



export default mode
