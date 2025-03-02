import React from "react";
import { Spring } from "react-spring/renderprops";
import { List } from "react-virtualized";
import usePages from "@utils/usePages";
import { Button } from "@components/button";

const ArrowButton = ({ disabled, up, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "fit-content",
        margin: "auto",
        background: "none",
        border: "none",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "auto" : "pointer",
        pointerEvents: disabled ? "none" : "auto"
      }}
    >
      <svg width="23" height="14" viewBox="0 0 23 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ rotate: up ? "180deg" : "" }}>
        <path d="M2 2L11.5 12.8858L21 2" stroke="#4E4E4E" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

export function AchievementsList({ data, achievementTab, setAchievementTab, ...rest }) {
  const lineHeight = 68;
  const length = data.length;
  const limit = 8
  const { page, onPageUp, onPageDown } = usePages(length, limit);

  const Row = ({ key, index, style }) => {
    const item = data[index];
    return (
      <div key={key} style={{ ...style, width: "100%" }}>
        <Button
          color="#91CB00"
          text={item.title}
          active={achievementTab === index}
          onClick={() => setAchievementTab(index)}
        />
      </div>
    );
  }

  return (
    <div {...rest}>
      <ArrowButton up onClick={onPageDown} disabled={page.from === 1} />
      <div style={{ height: lineHeight * limit, flexGrow: 1 }}>
        <Spring
          from={{ top: 0 }}
          to={{
            top: page.to >= length ? 800 : lineHeight * (page.from - 1)
          }}
        >
          {(props) => (
            <List
              height={lineHeight * limit}
              rowCount={data.length}
              rowHeight={lineHeight}
              width={1}
              rowRenderer={Row}
              containerStyle={{
                width: "100%",
                maxWidth: "100%",
              }}
              style={{
                width: "100%",
                overflow: "hidden",
              }}
              scrollTop={Math.floor(props.top)}
              className={rest.listclassname}
            />
          )}
        </Spring>
      </div>
      <ArrowButton onClick={onPageUp} disabled={page.to >= length} />
    </div>
  );
}
