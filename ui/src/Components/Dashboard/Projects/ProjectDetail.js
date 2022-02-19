import React from "react";
import styles from ".././Dashboard.module.css";
import { RiCloseLine } from "react-icons/ri";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function ProjectDetail(props) {
  return (
    <div className="container-fluid">
      <div className="row p-4">
        <div className="d-flex justify-content-end">
          <RiCloseLine
            size="30px"
            cursor="pointer"
            onClick={() => props.closeProject()}
          />
        </div>
        <h3>{props.selectedProject.title}</h3>
        <small>{props.selectedProject.description}</small>
        <h4 className="my-4">Tools</h4>
        {props.selectedProject.tools?.map((tool, index) => (
          <div
            className="col-xl-4 col-md-6 col-sm-6 col-xs-2  mb-4"
            key={index}
          >
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id={`tooltip-${tool.title}}`}>
                  {tool.description}
                </Tooltip>
              }
            >
              <div className="card">
                <a
                  className="text-decoration-none"
                  href={tool.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="card-body">
                    <div className="card-text text-center d-flex justify-content-center align-items-center">
                      <img
                        src={`https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${tool.url}&size=16`}
                        alt="ToolIcon"
                        className={styles.tool_icon}
                      />
                      <div className="mx-2 my-0">{tool.title}</div>
                    </div>
                  </div>
                </a>
              </div>
            </OverlayTrigger>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectDetail;
