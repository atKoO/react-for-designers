import * as React from "react";
import { PropertyControls, ControlType, Frame } from "framer";
import styled from "styled-components";

interface Props {
  title: string;
  description: string;
  svg: string;
  amount: number;
  examount: string;
  trType: "send" | "add" | "exchange";
  status: "completed" | "inprogress" | "declined";
  width: number;
  height: number;
  sign: string;
  reference: number;
  referenceSign: string;
  badgeText: string;
}

export class Transaction extends React.Component<Props> {
  static defaultProps = {
    title: "Funds sent",
    description: "",
    svg: "",
    amount: 0.647497,
    examount: "",
    trType: "send",
    status: "completed",
    width: 940,
    height: 72,
    sign: "",
    reference: "",
    referenceSign: "",
    badgeText: "In progress"
  };

  static propertyControls: PropertyControls = {
    title: { type: ControlType.String, title: "Title" },
    description: { type: ControlType.String, title: "Description" },
    amount: { type: ControlType.String, title: "Amount" },

    trType: {
      type: ControlType.SegmentedEnum,
      options: ["send", "add", "exchange"],
      optionTitles: ["Send", "Add", "Echange"],
      title: "Type"
    },

    status: {
      type: ControlType.SegmentedEnum,
      options: ["completed", "inprogress", "declined"],
      optionTitles: ["Done", "Pending", "Error"],
      title: "Status"
    }
  };

  render() {
    var {
      description,
      title,
      sign,
      amount,
      status,
      trType,
      svg,
      description,
      badgeText,
      sign,
      referenceSign
    } = this.props;

    const isCompleted = status === "completed";
    const isDeclined = status === "declined";
    const isSend = trType === "send";
    const btcRate = 6530.65;
    var price = (amount * btcRate).toFixed(2);

    if (status == "declined") {
      description = "You don't have Ƀ" + amount;
      badgeText = "Declined";
    } else {
      description = "";
    }

    if (trType == "send") {
      svg = (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
            fill="#053F33"
          />
        </svg>
      );
      title = "Funds sent";
      sign = "Ƀ";
      referenceSign = "";
      price = "";
    } else if (trType == "add") {
      svg = (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#053F33" />
        </svg>
      );
      title = "Funds added";
      sign = "+Ƀ";
      referenceSign = "";
      price = "";
    } else if (trType == "exchange") {
      svg = (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 7H17V10L21 6L17 2V5H5V11H7V7ZM17 17H7V14L3 18L7 22V19H19V13H17V17Z"
            fill="#053F33"
          />
        </svg>
      );
      title = "Funds exchanged";
      sign = "+ Ƀ";
      description = "BTC to USD";
      referenceSign = "$";
    }
    return (
      <Container>
        <Content>
          <Icon>{svg}</Icon>
          <Info>
            <h4>{title}</h4>
            <p style={{ color: isDeclined ? "#E2604E" : "#82827F" }}>
              {description}
            </p>
          </Info>
        </Content>
        <ContentAmount>
          <Badge
            style={{
              visibility: isCompleted ? "hidden" : "visible",
              background: isDeclined ? "#FDC4BD" : "#FFF29E"
            }}
          >
            {badgeText}
          </Badge>
          <Amount>
            <h4 style={{ color: isSend ? "#212323" : "#009B5B" }}>
              {sign}
              {amount}
            </h4>
            <Reference>
              {referenceSign}
              {price}
            </Reference>
          </Amount>
        </ContentAmount>
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: white;
  border-bottom: 1px solid #e1e7eb;
  align-items: center;

  h4 {
    font-size: 18px;
    margin: 0 0 2px 0;
  }

  p {
    font-size: 14px;
    margin: 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background: #EAF9E7;
  float: left;
  margin-right: 16px;
  padding: 8px;
`;

const Info = styled.div``;

const ContentAmount = styled.div`
  text-align: right;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Badge = styled.div`
  padding: 3px 8px 3px 8px;
  background: #fff29e;
  margin-right: 80px;
  font-size: 12px;
  min-width: 20px;
`;

const Amount = styled.div``;

const Reference = styled.div`
  font-size: 14px;
  margin: 0;
  color: #82827f;
`;
