import React, { useRef, useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import styled from "styled-components";
import { Image } from "@components/Image"
import * as styles from "@styles/materials.module.scss";


import MarketGrowthMobileComponent from "./MarketGrowthMobileComponent";


// Styled Components

const Container = styled.div`
  display: grid;
  grid-template-columns: 4fr 8fr;
  gap: 20px;
padding:80px 0;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 600;
  line-height: 115%;
  color:white;
  @media (max-width:767px) {
    font-size: 1.875rem;
  } 
`;

const StyledTabs = styled(Tabs)`
  display: flex;
  flex-direction: column;
`;

const StyledTabList = styled(TabList)`
  list-style: none;
  padding: 0;
  margin: 120px 0 20px 0;
  width:70%;
  display:block;
  
  @media (max-width:1139px) {
    display:none;
  }
`;
const StyledTabListMobile = styled(TabList)`
  list-style: none;
  padding: 0;
  margin: 120px 0 20px 0;
  width:70%;
  display:none;
  
  @media (max-width:1139px) {
    display:block;width:100%; margin: 60px 0 20px 0;
  }
`;

const StyledTab = styled(Tab)`
 padding: 15px;
  cursor: pointer;
  border-radius: 8px;
   margin-bottom: 20px;
  text-align: center;
  border:1px solid white;
  font-size:20px; color:#fff;
  min-width:100%;

   @media (max-width:1139px) {
    min-width:100%;
     padding: 15px;
  }
  @media (max-width:767px) {
    font-size:14px !important;
  }
  &:hover {
    background: #91CB00;
     border-radius: 8px;
      border:1px solid #91CB00;
  }

  &.react-tabs__tab--selected {
    background:  #91CB00;
     border-radius: 8px;
    color: white;
    font-weight: bold;
     border:1px solid #91CB00;
  }
`;

const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const List = styled.ul`
  display:block;
  padding: 0;
  margin: 0 0 50px 0;
  list-style: disc !important;
  list-style:inside;
  list-style-type: disc !important;
  @media (max-width:767px) {
    padding-left: 0.75rem;
  }
`;

const ListItem = styled.li`
  padding: 8px 0;
  list-style-type: disc !important;
  display: list-item;
  word-wrap: break-word;

  color:#fff;
  display: list-item;
  text-align: -webkit-match-parent;
  unicode-bidi: isolate;
  @media (max-width:767px) {
    font-size:12px !important;
  } 
  @media (min-width:768px) {
    font-size:20px !important;
  } 
  @media (max-width:767px) {
    font-size: 1rem !important;
  }
`;

const TabContent = styled.div`
  padding: 16px;
  img { width:100%; }
`;

const DesktopTabs = styled.div`
  @media (max-width:1139px) {
    display:none;
  } 
`

const TabletMobileTabs = styled.div`
@media (min-width:1140px) {
  display:none;
} `

const MarketGrowthComponent = ({ data }) => {
  const { left_column, right_column, list } = data
  return (
    <>
      <section className={`custom-section-layout ${styles.naturalStoneStrengthSection}`}>

        <div className={styles.sectionWrapper}>
          <TabletMobileTabs>
            <Title>{left_column?.title}</Title>
            <div className="right-column ">
              <List>
                {right_column && right_column?.list?.map((item, index) => (
                  <ListItem key={index}>{item}</ListItem>
                ))}
              </List>
            </div>
            
            <MarketGrowthMobileComponent list={list} />
          </TabletMobileTabs>
          <DesktopTabs>
            <StyledTabs defaultIndex={0} orientation="vertical" >
              <Container className="columns-container">
                {/* Left Column - Sidebar */}
                <Sidebar className="left-column">
                  <Title>{left_column?.title}</Title>
                  <StyledTabList>
                    {list && list.map((item, index) => (
                      <StyledTab key={index}>{item?.title}</StyledTab>
                    ))}
                  </StyledTabList>

                </Sidebar>
                {/* Right Column - Content */}
                <ContentArea className="right-column">
                  <List>
                    {right_column && right_column?.list?.map((item, index) => (
                      <ListItem key={index}>{item}</ListItem>
                    ))}
                  </List>
                  {list && list.map((item, index) => (
                    <TabPanel key={index}>
                      <TabContent>
                        {/* <img src={Image} /> */}
                        <Image
                          src={item.image}
                          alt={item.title + " image"}
                          style={{ width: "100%" }}
                        />
                      </TabContent>
                    </TabPanel>
                  ))}
                </ContentArea>
              </Container>
            </StyledTabs>
          </DesktopTabs>

        </div>
      </section>
    </>
  );
};

export default MarketGrowthComponent;
