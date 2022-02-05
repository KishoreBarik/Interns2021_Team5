import React, { useEffect, useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import Image from "react-bootstrap/Image";
import AddTool from "./AddTool/AddTool";
import "./AdminTools.css";

function AdminTools() {
  const [tools, setTools] = useState(null);
  const [open, setOpen] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [selectedTool, setSelectedTool] = useState({});

  let toolIndex;
  const fetchTools= async () => {
    const response = await fetch("http://localhost:5000/tools");
    const tools = await response.json();
    setTools(tools);
    console.log(tools);
  };

  const editSelected = (id) => {
    toolIndex = tools.findIndex((p) => p.id === id);
    console.log(tools[toolIndex]);
    setSelectedTool(tools[toolIndex]);
    id === selectedTool.id && !open ? setOpen(true) : setOpen(false);
  };

  useEffect(() => {
    fetchTools();
  }, []);
  return (
    <div className="my-2">
      <div className="d-flex justify-content-end my-2">
        <button
          onClick={() => setIsAdd(!isAdd)}
          aria-controls="addTool"
          aria-expanded={isAdd}
          className="btn btn-primary float-right"
        >
          {isAdd ? "Cancel" : "Add tool"}
        </button>
      </div>
      <Collapse in={isAdd}>
        <div id="addTool" className="bg-light my-2">
          <AddTool title="Add Tool Form "/>
        </div>
      </Collapse>

      <div className="list-group">
        {tools &&
          tools.map((tool) => (
            <div
              className="list-group-item flex-column align-items-start"
              key={tool.id}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <Image

                    src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${tool.url}&size=32`}
                    className="img-thumbnail"
                    width={30}
                    height={50}
                  />
                  <div className="mx-2">
                    <h6 className="m-0">{tool.title}</h6>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-secondary mx-2"
                    onClick={() => editSelected(tool.id)}
                    aria-controls={tool.id}
                    aria-expanded={
                      tool.id === selectedTool.id && open === false
                        ? true
                        : false
                    }
                  >
                    {tool.id === selectedTool.id && !open
                      ? "Cancel"
                      : "Edit"}
                  </button>
                  <button type="button" className="btn btn-outline-danger">
                    Delete
                  </button>
                </div>
              </div>
              <Collapse
                in={
                  tool.id === selectedTool.id && open === false
                    ? true
                    : false
                }
                className="my-3"
              >
                <div id={tool.id} className="bg-light">

                      <AddTool selectedTool={selectedTool} title="Edit Tool Form"/>
                      
                </div>
              </Collapse>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminTools;

