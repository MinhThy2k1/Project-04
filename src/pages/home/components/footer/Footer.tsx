import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import "../footer/footer.scss"
import { useTranslation } from "react-i18next";
export default function Footer() {
  const { t } = useTranslation();
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>{t("footer.follow")}</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className='footer-box'>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                GameHobby
              </h6>
              <p>
                {t("footer.title")}
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>{t("footer.product")}</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Nitendo
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Playstation
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Gaming Lifestyle
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Gundam
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>{t("footer.contact")}</h6>
              <p>
                <a href='#!' className='text-reset'>
                  {t("footer.policybh")}
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  {t("footer.policydt")}
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  {t("footer.policyvc")}
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  {t("footer.policybm")}
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>{t("footer.connect")}</h6>
              <div>
                <iframe className='Video' width="560" height="315" src="https://www.youtube.com/embed/Qa8j6cSZOs8?si=ycjfRanYIsYypIob" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              </div>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Địa Chỉ: 221/7/37, Đất Thánh, P.6, Quận Tân Bình, TP.HCM
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                Email: GameHobby@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> Hotline: 0923.867.916
              </p>

            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          GameHobby
        </a>
      </div>
    </MDBFooter>
  );
}