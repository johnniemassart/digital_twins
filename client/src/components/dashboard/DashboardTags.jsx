import React, { useState } from "react";
import { Link } from "react-router-dom";

const DashboardTags = () => {
  let dashboardTags = [
    {
      id: 0,
      name: "about",
      display: false,
      links: [
        "lsii initiative & leadership",
        "lsic mission & leadership",
        "lsic executive committee",
        "lsic member institutions",
      ],
    },
    {
      id: 1,
      name: "our work",
      display: false,
      links: [
        "in situ resource utilization",
        "surface power",
        "excavation and construction",
        "crosscutting capabilities",
      ],
    },
    {
      id: 2,
      name: "resources",
      display: false,
      links: [
        "access to space opportunities",
        "documents and reports",
        "employement opportunities",
        "funding opportunities",
        "lsic resource",
        "community",
      ],
    },
    { id: 3, name: "news", display: false },
    { id: 4, name: "events", display: false },
    { id: 5, name: "contact us", display: false },
  ];
  const [tags, setTags] = useState(dashboardTags);

  const handleClick = (id) => {
    const updateTagList = tags.map((tag) => {
      if (id === tag.id) {
        const newTags = {
          ...tag,
          display: !tag.display,
        };
        return newTags;
      } else {
        const otherTags = {
          ...tag,
          display: false,
        };
        return otherTags;
      }
    });
    setTags(updateTagList);
  };

  return (
    <div className="dashboard-tags-wrapper">
      <div className="tags-title-wrapper">
        <p className="tags-title">tags</p>
      </div>
      <div className="tags-wrapper">
        {tags.map((tag) => {
          return (
            <p
              key={tag.id}
              className="tag"
              onClick={() => handleClick(tag.id)}
              style={{ color: tag.display && "white" }}
            >
              {tag.name}
            </p>
          );
        })}
      </div>
      <div className="links-wrapper">
        {tags.map((tag) => {
          return (
            <div key={tag.id}>
              {tag.display && tag.links && (
                <div key={tag.id}>
                  {tag.links.map((link) => {
                    return (
                      <p key={link} className="links-link">
                        {link}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardTags;
