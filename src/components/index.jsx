import { useState } from "react";
import data from "./data";

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelect, setEnableMultiSelect] = useState(false);
  const [multiSelect, setMultiSelect] = useState([]);

  const handleSingleSelection = (currentId) => {
    if (selected === currentId) {
      setSelected(null);
    } else {
      setSelected(currentId);
    }
  };

  const handleMultiSelection = (currentId) => {
    if (multiSelect.includes(currentId)) {
      setMultiSelect(multiSelect.filter((id) => id !== currentId));
    } else {
      setMultiSelect([...multiSelect, currentId]);
    }
  };

  return (
    <div className="flex flex-col h-full justify-center items-center">
      <button
        className={`px-10 py-5 mt-10 mb-5 font-semibold text-white rounded ${
          enableMultiSelect ? "bg-green-500" : "bg-cyan-900"
        }`}
        onClick={() => {
          setEnableMultiSelect(!enableMultiSelect);
          setMultiSelect([]);
          setSelected(null);
        }}
      >
        Enable multi selection
      </button>
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item.id}
            className="w-2/4 bg-cyan-900 mt-5 mb-5 px-10 py-10 text-white first:mt-20"
          >
            <div
              className="flex text-xl justify-between items-center cursor-pointer"
              onClick={
                enableMultiSelect
                  ? () => handleMultiSelection(item.id)
                  : () => handleSingleSelection(item.id)
              }
            >
              {item.question}
              <span>{selected === item.id ? "-" : "+"}</span>
            </div>
            <div className="items-left h-auto text-left mt-5 transition-all duration-500">
              {enableMultiSelect && multiSelect.includes(item.id)
                ? item.answer
                : null}

              {!enableMultiSelect && selected === item.id ? item.answer : null}
            </div>
          </div>
        ))
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}
