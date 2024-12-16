import { Body, Container, Column, Head, Heading, Html, Img, Link, Preview, Row, Section, Text, Tailwind, Button } from "@react-email/components";
import * as React from "react";

export default function Content({ otp = "0000", user }) {
  return (
    <>
      <Html>
        <Body>
          <Tailwind>
            <Preview>Confirm your email address</Preview>
            <Container>
              <div className="flex justify-center items-center align-middle my-8">
                <Img className="inline" src="http://localhost:3001/images/icon.ico" alt="Slack" />
                <span className="text-bold text-xl ml-2">JAGRAON GARMENTS</span>
              </div>
              <div className="h-32 rounded-md text-purple-600 flex flex-col justify-center " style={{ backgroundImage: `url("http://localhost:3001/images/emailBack.png")` }}>
                <div className="flex flex-col ml-10">
                  <span style={{ fontSize: "2em", fontWeight: "bold" }} className=" text-2xl ">
                    J G
                  </span>
                  <span className="text-xs">Where Trends Meet Timeless.</span>
                </div>
              </div>
              <Heading>Hi {user},</Heading>
              <div className="text-gray-700">
                <div>Here is your One Time Password(OTP).</div>
                <div>Enter in browser To reset your password.</div>
              </div>
              <div className="py-8">
                <div className="flex gap-2 justify-center mx-auto">
                  {otp.split("").map((number, index) => {
                    return (
                      <span key={index} style={{ fontSize: "1.5em", fontWeight: "bold" }} className="bg-purple-100 px-6 py-4 rounded-md">
                        {number}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="text-gray-700">
                <div>
                  OTP will expire in<span className="text-black"> 5 minutes.</span>
                </div>
              </div>
              <div className="text-gray-700 my-8">
                <div>Best Regards,</div>
                <div className="text-purple-600">JG Team.</div>
              </div>
              <hr className="bg-gray-300 border-0 h-0.5 mt-10" />
              <div className=" flex justify-center  items-center gap-2">
                <Link href="http://localhost:3001">
                  <Img className="inline" height="70px" src="http://localhost:3001/images/web.jpg" alt="Slack" />
                </Link>
                <Link>
                  <Img className="bg-white" height="48px" src="http://localhost:3001/images/instaLogo.avif" alt="Slack" />
                </Link>
              </div>
              <hr className="bg-gray-300 border-0 h-0.5 " />
              <Section className="text-gray-500 my-10">
                <Section className="w-fit mx-auto">
                  <Link className="text-gray-500" href="https://slackhq.com" target="_blank" rel="noopener noreferrer">
                    Our blog
                  </Link>
                  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                  <Link className="text-gray-500" href="https://slack.com/legal" target="_blank" rel="noopener noreferrer">
                    Policies
                  </Link>
                  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                  <Link className="text-gray-500" href="https://slack.com/help" target="_blank" rel="noopener noreferrer">
                    Help center
                  </Link>
                  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                  <Link className="text-gray-500" href="https://slack.com/community" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" data-linkindex="6">
                    Slack Community
                  </Link>
                </Section>
                <Text>
                  © 2024 JAGRAON GARMENTS. <br />
                  V.P.O Daudhar, Dist:- Moga,Punjab,India <br />
                  <br />
                  All rights reserved.
                </Text>
              </Section>
            </Container>
          </Tailwind>
        </Body>
        <script src="https://cdn.lordicon.com/lordicon.js"></script>
      </Html>
    </>
  );
}
