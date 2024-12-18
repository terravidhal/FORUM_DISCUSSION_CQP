import "./ModalSevenKidsCodeVerif.css";
import { forwardRef } from "react";
import QRCode from "react-qr-code";

interface ModalSevenKidsCodeProps {
  name: string;
  linkVerif: string;
  course: string;
  dateOfConductStart: string;
  dateOfConductEnd: string;
  dateOfCertif: string;
}

const ModalSevenKidsCodeVerif = forwardRef<HTMLDivElement, ModalSevenKidsCodeProps>( ({ name, linkVerif, dateOfCertif, course,  }, ref) => {
    return (
      <div className="ModalSevenKidsCodeVerif bg-white p-3">
        <div ref={ref} className="containerse pm-certificate-container">
        <div className="outer-border">
          <div className="inner-border">
            <div className="pm-certificate-border col-xs-12">
              <div
                style={{ position: "relative" }}
                className="row pm-certificate-header"
              >
                <div className="pm-certificate-title cursive col-xs-12 text-center">
                  <h2>SevenGps kids code  Certificate of Completion</h2>
                </div>
                <span
                  style={{
                    width: "190px",
                    height: "150px",
                    position: "absolute",
                    top: "90px",
                    right: "20px",
                  }}
                  className="pm-name-text bold"
                >
                  <img src="/images/badge.webp" alt="" />
                </span>
              </div>
              <div className="row pm-certificate-body">
                <div className="pm-certificate-block">
                  <div className="col-xs-12">
                    <div className="row">
                      <div className="col-xs-2"></div>
                      <div className="pm-certificate-name underline margin-0 col-xs-8 text-center">
                        <span className="pm-name-text bold">
                          TrueNorth Administrator
                        </span>
                      </div>
                      <div className="col-xs-2"></div>
                    </div>
                  </div>
                  <div className="col-xs-12">
                    <div className="row">
                      <div className="col-xs-2"></div>
                      <div className="pm-earned col-xs-8 text-center">
                        <span className="pm-earned-text padding-0 block cursive">
                          certified
                        </span>
                        <span
                          style={{
                            textTransform: "uppercase",
                            fontSize: "2rem",
                          }}
                          className="pm-credits-text block bold sans"
                        >
                          {name}
                        </span>
                      </div>
                      <div className="col-xs-2"></div>
                      <div className="col-xs-12"></div>
                    </div>
                  </div>
                  <div className="col-xs-12">
                    <div className="row">
                      <div className="col-xs-2"></div>
                      <div className="pm-course-title col-xs-8 text-center">
                        <span className="pm-earned-text block cursive">
                          while completing the training course entitled
                        </span>
                      </div>
                      <div className="col-xs-2"></div>
                    </div>
                  </div>
                  <div className="col-xs-12">
                    <div className="row">
                      <div className="col-xs-2"></div>
                      <div className="pm-course-title underline col-xs-8 text-center">
                        <span className="pm-credits-text block bold sans">
                          {course}
                        </span>
                      </div>
                      <div className="col-xs-2"></div>
                    </div>
                  </div>
                </div>
                <div className="col-xs-12">
                  <div className="row">
                    <div className="pm-certificate-footer">
                      <div
                        style={{ flex: 1 }}
                        className="col-xs-4 pm-certified col-xs-4 text-center"
                      >
                        <span
                          style={{ textDecoration: "underline" }}
                          className="pm-credits-text block sans"
                        >
                          Buffalo City School District
                        </span>
                        <span
                          style={{
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                          className="block underline"
                        >
                          <QRCode
                            size={256} //256
                            style={{
                              height: "auto",
                              maxWidth: "72px",
                              width: "72px",
                            }}
                            value={linkVerif}
                            viewBox={`0 0 256 256`} // 0 0 256 256
                          />
                        </span>
                        <span
                          style={{ textDecoration: "underline" }}
                          className="bold block"
                        >
                          Crystal Benton Instructional Specialist II, Staff
                          Development
                        </span>
                      </div>
                      <div
                        style={{ flex: 1, position: "relative" }}
                        className="col-xs-4 pm-certified col-xs-4 text-center"
                      >
                        <span
                          style={{ textDecoration: "underline" }}
                          className="pm-credits-text block sans"
                        >
                          Date Completed
                        </span>
                        <span className="pm-empty-space block underline">
                          {dateOfCertif}
                        </span>
                        <span
                          style={{
                            position: "relative",
                            top: "-20px",
                            left: "90px",
                          }}
                          className="pm-empty-space block underline"
                        >
                          <img
                            width={140}
                            height={10}
                            src="/images/sign3.jpg"
                            alt=""
                          />
                        </span>
                        <span
                          style={{ textDecoration: "underline" }}
                          className="bold block"
                        >
                          DOB:{" "}
                        </span>
                        <span
                          style={{ textDecoration: "underline" }}
                          className="bold block"
                        >
                          Social Security # (last 4 digits)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
);

export default ModalSevenKidsCodeVerif;
