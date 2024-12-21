import { Body, Container, Column, Head, Heading, Html, Img, Link, Preview, Row, Section, Text, Tailwind, Button, Hr } from "@react-email/components";
import * as React from "react";

export default function Content({ otp = "0000", user }) {
  const headerContent = { padding: "20px 30px 15px" };

  const headerContentTitle = {
    color: "#fff",
    fontSize: "27px",
    fontWeight: "bold",
    lineHeight: "27px",
  };

  const headerContentSubtitle = {
    color: "#fff",
    fontSize: "17px",
  };

  const headerImageContainer = {
    padding: "30px 10px",
  };

  const headerImage = {
    maxWidth: "100%",
  };
  const header = {
    borderRadius: "5px 5px 0 0",
    display: "flex",
    flexDireciont: "column",
    backgroundColor: "#2b2d6e",
    maxWidth: "350px",
    marginTop: "20px",
  };
  return (
    <>
      <Html>
        <Tailwind>
          <Body className="bg-white m-0 p-4">
            <Preview>Confirm your email address</Preview>
            <Row className="w-1/2">
              <Column align="center" className="h-[40px] w-fit">
                <Img src={`https://j-shop.s3.eu-north-1.amazonaws.com/icon.ico`} alt="Slack" />
              </Column>
              <Column align="center" className="h-[40px] w-fit px-2">
                <span className="text-bold text-xl">JAGRAON GARMENTS</span>
              </Column>
            </Row>
            <Section style={header}>
              <Row>
                <Column style={headerContent}>
                  <Heading style={headerContentTitle}>J G</Heading>
                  <Text style={headerContentSubtitle}>Where Trends Meet Timeless.</Text>
                </Column>
                <Column style={headerImageContainer}>
                  <Img style={headerImage} width={340} src={`https://j-shop.s3.eu-north-1.amazonaws.com/emailcover.png`} />
                </Column>
              </Row>
            </Section>
            <div className="bg-white px-8 pt-8 pb-4 rounded-md shadow-md">
              <Heading>Hi {user},</Heading>
              <div className="text-gray-700">
                <div>Here is your One Time Password(OTP).</div>
                <div>Enter in browser To reset your password.</div>
              </div>
              <div className="py-8 w-full">
                <div className="w-fit mx-auto">
                  {otp.split("").map((number, index) => {
                    return (
                      <span key={index} style={{ fontSize: "1.5em", fontWeight: "bold" }} className="bg-purple-100 ml-2 px-6 py-4 rounded-md">
                        {number}
                      </span>
                    );
                  })}
                </div>
              </div>
              <Section>
                <div className="text-gray-700">
                  <div>
                    OTP will expire in<span className="text-black"> 5 minutes.</span>
                  </div>
                </div>
                <div className="text-gray-700 my-8">
                  <div>Best Regards,</div>
                  <div className="text-purple-600">JG Team.</div>
                </div>
                <Hr className="my-[16px] border-t-2 border-gray-300" />
                <div className=" w-full">
                  <div className="w-fit mx-auto flex">
                    <Link href="https://j-store-mrd9877s-projects.vercel.app">
                      <Img className="" height="48px" src={`https://j-shop.s3.eu-north-1.amazonaws.com/web.jpg`} alt="Slack" />
                    </Link>
                    <Link href="https://www.instagram.com/jagraongarments">
                      <Img className="" height="48px" src={`https://j-shop.s3.eu-north-1.amazonaws.com/instaLogo.avif`} alt="Slack" />
                    </Link>
                  </div>
                </div>
                <Hr className="my-[16px] border-t-2 border-gray-300" />
                <div className="text-gray-500 my-10">
                  <div className="w-fit mx-auto">
                    <Link className="text-gray-500" href="https://slackhq.com" target="_blank" rel="noopener noreferrer">
                      Our blog
                    </Link>
                    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    <Link className="text-gray-500" href="https://slack.com/legal" target="_blank" rel="noopener noreferrer">
                      Policies
                    </Link>
                  </div>
                  <p className="text-center">
                    © 2024 JAGRAON GARMENTS. <br />
                    V.P.O Daudhar, Dist:- Moga,Punjab,India <br />
                    <br />
                    All rights reserved.
                  </p>
                </div>
              </Section>
            </div>
          </Body>
        </Tailwind>
        <script src="https://cdn.lordicon.com/lordicon.js"></script>
      </Html>
    </>
  );
}
