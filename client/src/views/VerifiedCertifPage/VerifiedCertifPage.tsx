import { useParams } from "react-router-dom";
import { useGeneralHook } from "@/hooks/generalHook";
import { useStudent } from "@/api/services";
import ModalSevenKidsCodeVerif from "./ModalSevenKidsCodeVerif/ModalSevenKidsCodeVerif";
import ModalSevenAcademyVerif from "./ModalSevenAcademyVerif/ModalSevenAcademyVerif";
import { Facebook, Instagram, Linkedin, Twitter, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const VerifiedCertifPage = () => {
  const { certificateRef } = useGeneralHook();
  const { OneStudent, isLoadedDetailsStudent } = useStudent();
  const { CertifModel } = useParams();
  const linkVerif = window.location.href;
  console.log(window.location.href, OneStudent);

  return (
    <div
      className=" VerifiedCertifPage relative"
      style={{ position: "relative" }}
    >
      <div
        className="head_infos"
        style={{
          height: "105px",
          backgroundColor: "#6d88f8",
          textAlign: "left",
          color: "white",
          fontSize: "3.5rem",
          fontWeight: "bold",
        }}
      ></div>
      <div
        className="content_infos"
        style={{ position: "absolute", top: "52px", left: "207px" }}
      >
        <div
          className="modal_preview"
          style={{
            width: "830px",
            height: "auto",
            backgroundColor: "#fff",
            marginBottom: "20px",
            boxShadow: "0px 2px 4px 1px #48464666",
          }}
        >
          <div
            className="header_modal"
            style={{
              paddingLeft: "20px",
              paddingRight: "30px",
              height: "53px",
              backgroundColor: "#eceff4",
              fontWeight: "500",
              color: "#848585",
              display: "flex",
            }}
          >
            <div
              className="verified_item"
              style={{ display: "flex", alignItems: "center", gap: "20px" }}
            >
              <img
                height="30px"
                width="20px"
                color="red"
                src="/images/verif.svg"
                alt="verif"
              />
              Verified
            </div>
          </div>
          <div className="content_modal" style={{ padding: "20px 30px" }}>
            {CertifModel === "Seven_Academy" ? (
              isLoadedDetailsStudent === false ? (
                <ModalSevenAcademyVerif
                  linkVerif={linkVerif}
                  name={OneStudent.name}
                  ref={certificateRef}
                  course={OneStudent?.field?.name}
                  dateOfConductStart={OneStudent?.session?.dateOfConductStart}
                  dateOfConductEnd={OneStudent?.session?.dateOfConductEnd}
                  dateOfCertif={OneStudent?.session?.dateOfCertif || ""}
                />
              ) : (
                <Skeleton className="h-[520px] w-[100%]" />
              )
            ) : CertifModel === "Seven_Kids_Code" ? (
              isLoadedDetailsStudent === false ? (
                <ModalSevenKidsCodeVerif
                  linkVerif={linkVerif}
                  name={OneStudent.name}
                  ref={certificateRef}
                  course={OneStudent?.field?.name}
                  dateOfConductStart={OneStudent?.session?.dateOfConductStart}
                  dateOfConductEnd={OneStudent?.session?.dateOfConductEnd}
                  dateOfCertif={OneStudent?.session?.dateOfCertif || ""}
                />
              ) : (
                <Skeleton className="h-[520px] w-[100%]" />
              )
            ) : null}
          </div>
        </div>
        <div
          className="about_entrprise"
          style={{
            width: "830px",
            backgroundColor: "#fff",
            marginBottom: "20px",
            boxShadow: "0px 2px 4px 1px #48464666",
            display: "flex",
            padding: "30px 50px 40px 50px",
          }}
        >
          <div className="about_about" style={{ flex: "2" }}>
            <div className="title__text">
              <div className="logo_entrprise" style={{ flex: "1" }}>
                <img
                  width={350}
                  height={350}
                  src="/images/logo/logo-certifia-02.svg"
                  alt="icon certifia"
                />
              </div>
              <div
                className="text"
                style={{
                  color: "#333333",
                  marginBottom: "2rem",
                  lineHeight: "13pt",
                }}
              >
                Innovative Platform for Secure Certificate Management Discover
                our cutting-edge solution for creating and managing personalized
                certificates, specifically designed for educational
                institutions. This revolutionary application enables seamless
                and secure certification management through a centralized
                database.
              </div>
            </div>
            <div
              className="social_medias"
              style={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <div
                className="social_medias_title"
                style={{
                  color: "rgb(12, 13, 15)",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                Follow us on
              </div>
              <div
                className="social_medias_icons"
                style={{ display: "flex", gap: "5px" }}
              >
                <a href="#">
                  <div
                    style={{
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Facebook />
                  </div>
                </a>
                <a href="#">
                  <div
                    style={{
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Twitter />
                  </div>
                </a>
                <a href="#">
                  <div
                    style={{
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Instagram />
                  </div>
                </a>
                <a href="#">
                  <div
                    style={{
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Linkedin />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className="powered"
          style={{ color: "#767676", fontSize: "15px", margin: "30px 0" }}
        >
          Privacy & Terms - Powered By CERTIFIA
        </div>
      </div>

      <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
        <svg
          width="450"
          height="556"
          viewBox="0 0 450 556"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="277" cy="63" r="225" fill="url(#paint0_linear_25:217)" />
          <circle
            cx="17.9997"
            cy="182"
            r="18"
            fill="url(#paint1_radial_25:217)"
          />
          <circle
            cx="76.9997"
            cy="288"
            r="34"
            fill="url(#paint2_radial_25:217)"
          />
          <circle
            cx="325.486"
            cy="302.87"
            r="180"
            transform="rotate(-37.6852 325.486 302.87)"
            fill="url(#paint3_linear_25:217)"
          />
          <circle
            opacity="0.8"
            cx="184.521"
            cy="315.521"
            r="132.862"
            transform="rotate(114.874 184.521 315.521)"
            stroke="url(#paint4_linear_25:217)"
          />
          <circle
            opacity="0.8"
            cx="356"
            cy="290"
            r="179.5"
            transform="rotate(-30 356 290)"
            stroke="url(#paint5_linear_25:217)"
          />
          <circle
            opacity="0.8"
            cx="191.659"
            cy="302.659"
            r="133.362"
            transform="rotate(133.319 191.659 302.659)"
            fill="url(#paint6_linear_25:217)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_25:217"
              x1="-54.5003"
              y1="-178"
              x2="222"
              y2="288"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint1_radial_25:217"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
            >
              <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
            </radialGradient>
            <radialGradient
              id="paint2_radial_25:217"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
            >
              <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08" />
            </radialGradient>
            <linearGradient
              id="paint3_linear_25:217"
              x1="226.775"
              y1="-66.1548"
              x2="292.157"
              y2="351.421"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_25:217"
              x1="184.521"
              y1="182.159"
              x2="184.521"
              y2="448.882"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint5_linear_25:217"
              x1="356"
              y1="110"
              x2="356"
              y2="470"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint6_linear_25:217"
              x1="118.524"
              y1="29.2497"
              x2="166.965"
              y2="338.63"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute top-[100px] left-0 z-[-1] opacity-30 lg:opacity-100">
        <svg
          width="364"
          height="201"
          viewBox="0 0 364 201"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
            stroke="url(#paint0_linear_25:218)"
          />
          <path
            d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
            stroke="url(#paint1_linear_25:218)"
          />
          <path
            d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
            stroke="url(#paint2_linear_25:218)"
          />
          <path
            d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
            stroke="url(#paint3_linear_25:218)"
          />
          <circle
            opacity="0.8"
            cx="214.505"
            cy="60.5054"
            r="49.7205"
            transform="rotate(-13.421 214.505 60.5054)"
            stroke="url(#paint4_linear_25:218)"
          />
          <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
          <defs>
            <linearGradient
              id="paint0_linear_25:218"
              x1="184.389"
              y1="69.2405"
              x2="184.389"
              y2="212.24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_25:218"
              x1="156.389"
              y1="69.2405"
              x2="156.389"
              y2="212.24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_25:218"
              x1="125.389"
              y1="69.2405"
              x2="125.389"
              y2="212.24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_25:218"
              x1="93.8507"
              y1="67.2674"
              x2="89.9278"
              y2="210.214"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" stopOpacity="0" />
              <stop offset="1" stopColor="#4A6CF7" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_25:218"
              x1="214.505"
              y1="10.2849"
              x2="212.684"
              y2="99.5816"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint5_radial_25:218"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(220 63) rotate(90) scale(43)"
            >
              <stop offset="0.145833" stopColor="white" stopOpacity="0" />
              <stop offset="1" stopColor="white" stopOpacity="0.08" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default VerifiedCertifPage;
