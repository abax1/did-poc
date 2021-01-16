import React from "react";
import { withRouter } from "react-router-dom";
import CarImage from "../../components/SvgImages/CarImage";
import {
  H2,
  H3,
  H4,
  H5,
  Button,
  Icon,
  Navbar,
  Alignment,
  Card,
} from "@blueprintjs/core";
import DashSvg from "../../components/SvgImages/DashSvg";
import logo from "../../icon.png";
import swiss from "../../swiss.png";
import NetworkSvg from "../../components/SvgImages/NetworkSvg";
import CreateAccountSvg from "../../components/SvgImages/CreateAccountSvg";
import ProvisionCarSvg from "../../components/SvgImages/ProvisionCar";
import ParkSvg from "../../components/SvgImages/ParkSvg";
import PaySvg from "../../components/SvgImages/PaySvg";
import "./SplashPage.css";
import BioHeroSvg from "../../components/SvgImages/BioHero";

const accentColour = "#43bd16";
const buttonColour = "#FF8F8F";
const stripeColour = "#dedbe3ff";

const HeroImage = ({ theme }) => {
  return (
    <div className="splash-container">
      <div className="splash-left-col">
        <BioHeroSvg scale="80%" theme={theme} />
      </div>
      <div className="splash-right-col">
        <H2
          style={{ textAlign: "left", color: accentColour, fontSize: "30pt" }}
        >
          Bioledger
        </H2>
        <H3 style={{ textAlign: "left", color: accentColour }}>
          Blockchain Database for Sustainable Biofuels – RSB Pilot Project 2020
        </H3>
        <p style={{ textAlign: "left" }}>
          The “Blockchain database for sustainable biofuels” project is jointly
          led by the Roundtable on Sustainable Biomaterials (RSB) and Bioledger
          and aims to demonstrate the feasibility of a blockchain-based database
          solution for the European sustainably-certified biofuels market, with
          an initial focus on the used cooking oil (UCO) biodiesel supply chain.
        </p>
        <p style={{ textAlign: "left" }}>
            This project builds upon work conducted in 2017 and 2018 by RSB to
            explore blockchain’s potential for sustainability certification in
            the bioeconomy. The project engages stakeholders – including UCO
            collectors, biodiesel producers, traders, EU policymakers, industry
            associations, certification bodies and auditors – to identify any
            weaknesses in current biofuels traceability systems following recent
            fraud investigations, provide input into the development of a
            blockchain database prototype, and review preferred database
            governance models. The prototype is being tested with supply chain
            data volunteered by project partners and will be audited by
            blockchain analysts and an accredited certification body.
        </p>
      </div>
    </div>
  );
};

const cardStyle = {
  minHeight: "320px",
};

const imageSize = "130";

const Steps = ({ history }) => {
  return (
    <div className="splash-steps-container">
      <div className="splash-step1">
        <Card className="step-card-height" elevation={2}>
          <div className="step-card">
            <CreateAccountSvg scale={imageSize} />
          </div>
          <div style={{minHeight: "12rem"}}>
            <H5>Step 1</H5>
            <p>Drivers collecting Used Cooking Oil</p>
            <p>
              Capture evidence that a driver has performed and recorded a
              compliant collection of sustainable biofuel feedstock from a Point
              of Origin. This is the only way to generate a blockchain
              consignment within the system.
            </p>
          </div>
        </Card>
      </div>
      <div className="splash-step2">
        <Card className="step-card-height" elevation={2}>
          <div className="step-card">
            <ProvisionCarSvg scale={imageSize} />
          </div>
          <div style={{minHeight: "12rem"}}>
            <H5>Step 2</H5>
            <p>
              At the end of their collection route a Driver submits all of their
              collected blockchain consignments to their First Collector
              Administrator Account. Collected volumes of the same feedstock are
              aggregated into blockchain “Wallets”. Ownership of the wallets
              changes from Driver to Administrator who can now view summaries of
              all wallets they own and drill into the details of each
              collection.
            </p>
          </div>
        </Card>
      </div>
      <div className="splash-step3">
        <Card className="step-card-height" elevation={2}>
          <div className="step-card">
            <ParkSvg scale={imageSize} />
          </div>
          <div style={{minHeight: "12rem"}}>
            <H5>Step 3</H5>
            <p>
              Administrators can aggregate Wallets into larger Consignments.
              Consignments of like products can be aggregated, split and
              transferred as a sale to a Customer in the database. As the
              ownership of those consignments changes, they are removed from the
              Seller’s account and credited to the Buyer’s account.
            </p>
          </div>
        </Card>
      </div>
      <div className="splash-step4">
        <Card className="step-card-height" elevation={2}>
          <div className="step-card">
            <PaySvg scale={imageSize} />
          </div>
          <div style={{minHeight: "12rem"}}>
            <H5>Step 4</H5>
            <p>
              Auditors & Regulators can view the entire history of all
              transactions in the system to protect against non-compliances and
              fraud. A copy of the blockchain distributed ledger is held
              identically and simultaneously by at least two regulating Nodes
              (currently Bioledger & RSB). This means no changes to data can
              happen without compliance with the system logic and visibility of
              the Nodes.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

const DashImage = ({ history }) => {
  return (
    <div className="splash-container" style={{ backgroundColor: stripeColour }}>
      <div className="splash-left-col">
        <H2 style={{ textAlign: "right", color: accentColour }}>Dashboard</H2>
        <H5 style={{ textAlign: "right" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium,
          animi officiis et sapiente laborum fuga deleniti impedit minima
          voluptates distinctio, aliquam nobis? Blanditiis error eveniet
          corrupti velit sequi pariatur dolor?
        </H5>
        <div style={{ textAlign: "right" }}>
          <button
            className="splash-button"
            onClick={() => {
              history.push("/dashboard");
            }}
          >
            Go to dashboard
          </button>
        </div>
      </div>
      <div className="splash-right-col">
        <DashSvg scale="90%" />
      </div>
    </div>
  );
};

const NetworkImage = ({ history }) => {
  return (
    <div className="splash-container">
      <div className="splash-left-col">
        <NetworkSvg scale="90%" />
      </div>
      <div className="splash-right-col">
        <H2 style={{ textAlign: "left", color: accentColour }}>
          Network Peers
        </H2>
        <H5 style={{ textAlign: "left" }}>
          View your network peers on the blockchain. As a node operator, you can
          see all the other network node identities on the blockchain.
        </H5>
        <div style={{ textAlign: "left" }}>
          <button
            className="splash-button"
            onClick={() => {
              history.push("/peers");
            }}
          >
            Go to peers network
          </button>
        </div>
      </div>
    </div>
  );
};

const SplashPage = ({ history, theme }) => {
  return (
    <>
      <Navbar fixedToTop={true}>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>
            <img src={logo} alt="DAB" height="30" width="30" />
          </Navbar.Heading>
          <Navbar.Heading style={{ color: "#848484" }}>
            <H4 style={{ color: "#848484", paddingTop: "7px" }}>
              Bioledger<sub style={{ fontSize: "5pt" }}>ALPHA</sub>
            </H4>
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <button
            className="splash-button"
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </button>
        </Navbar.Group>
      </Navbar>
      <div style={{ textAlign: "center", paddingTop: "20px" }}>
        <HeroImage theme={theme} />
        <Steps />
        <img
          //className="pointer"
          onClick={() => {
            //props.history.push("/");
          }}
          src={swiss}
          alt="logo"
          //height="50"
          //width="150"
        />
      </div>
    </>
  );
};

export default withRouter(SplashPage);
