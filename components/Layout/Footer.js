import Link from 'next/link'

export default function Footer() {
  return (
    <>
    <footer id="footer" className="mt-4">
        <div className="footer-top">
          <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6 footer-contact">
                  <h3>companytemplate.com</h3>
                  <p>
                    California
                    <br />
                    Los Angeles
                    <br />
                    999 Figueroa St
                    <br />
                    <br />
                    <strong>Mail </strong>
                    info@example.com
                  </p>
                </div>
                <div className="col-lg-2 col-md-6 footer-links">
                  <h4>Navigation</h4>
                  <ul>
                      <li>
                          <i className="bx bx-chevron-right"></i>
                          <Link href="/#hero">
                              <a>Home</a>
                          </Link>
                      </li>
                      <li>
                          <i className="bx bx-chevron-right"></i>
                          <Link href="/#about">
                              <a>About Us</a>
                          </Link>
                      </li>
                      <li>
                          <i className="bx bx-chevron-right"></i>
                          <Link href="/#partners">
                              <a>Partners</a>
                          </Link>
                      </li>
                      <li>
                          <i className="bx bx-chevron-right"></i>
                          <Link href="/#members">
                              <a>Members</a>
                          </Link>
                      </li>
                      <li>
                          <i className="bx bx-chevron-right"></i>
                          <Link href="/#team">
                              <a>Team</a>
                          </Link>
                      </li>
                      <li>
                          <i className="bx bx-chevron-right"></i>
                          <Link href="/#faq">
                              <a>FAQ</a>
                          </Link>
                      </li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom container d-md-flex py-4">
          <div className="me-md-auto text-center text-md-start">
              <div className="copyright">&copy; 2021</div>
          </div>
          <div className="social-links text-center text-md-right pt-3 pt-md-0">
          <a href="#" rel="noreferrer" target="_blank">
              <i className="bx bxl-twitter"></i>
          </a>
          <a href="#" rel="noreferrer" target="_blank">
              <i className="bx bxl-facebook"></i>
          </a>
          <a href="#" rel="noreferrer" target="_blank">
              <i className="bx bxl-instagram"></i>
          </a>
          <a href="#" rel="noreferrer" target="_blank">
              <i className="bx bxl-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
    </>
  )
}