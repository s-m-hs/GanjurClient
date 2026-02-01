const CustomToolbar = ({ onInsertHTML }) => (
  <div id="toolbar">
    {/* فونت‌ها */}
    <select className="ql-font">
      <option value="vazir" selected>
        Vazir
      </option>
      <option value="Yekan">Yekan</option>
      <option value="BMitra">BMitra</option>
      <option value="BTITRBD">BTitr</option>
      <option value="BNazanin">BNazanin</option>
      <option value="serif">Serif</option>
      <option value="monospace">Monospace</option>
    </select>

    <select className="ql-size">
      <option value="small">کوچک</option>
      <option value="normal" selected>
        عادی
      </option>
      <option value="large">بزرگ</option>
      <option value="huge">خیلی بزرگ</option>
    </select>

    <button className="ql-bold" title="Bold"></button>
    <button className="ql-italic" title="Italic"></button>
    <button className="ql-underline" title="Underline"></button>
    <button className="ql-strike" title="Strike"></button>

    <select className="ql-color" title="Text Color"></select>
    <select className="ql-background" title="Background Color"></select>

    <select className="ql-header">
      <option value="1">Heading 1</option>
      <option value="2">Heading 2</option>
      <option value="3">Heading 3</option>
      <option value="" selected>
        Normal
      </option>
    </select>

    <button className="ql-list" value="ordered" title="Ordered List"></button>
    <button className="ql-list" value="bullet" title="Bullet List"></button>

    {/* <select className="ql-align">
        <option value="" selected>Default</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
        <option value="justify">Justify</option>
      </select>  */}

    <button className="ql-direction" value="rtl" title="Right to Left"></button>

    <button className="ql-align" value="center" title="Align Center"></button>
    <button className="ql-align" value="right" title="Align Right"></button>
    <button className="ql-align" value="justify" title="Justify Text"></button>

    <button className="ql-link" title="Add Link"></button>
    {/* <button className="ql-video" title="Add Video"></button> */}

    <button className="ql-clean" title="Remove Formatting"></button>
    <button className="ql-html" title="Insert HTML" onClick={onInsertHTML}>
      <span
        className="centerr"
        style={{
          paddingLeft: "20px",
          justifyContent: "center,",
          alignItems: "center",
          fontSize: "12px",
          color: "#3c3a3a",
        }}
      >
        <i class="fa-solid fa-film fa-md"></i>IFrame
      </span>
    </button>
  </div>
);

export default CustomToolbar;
