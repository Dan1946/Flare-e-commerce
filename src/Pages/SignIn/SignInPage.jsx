import { useEffect, useState } from "react";
import styles from "./SignIn.module.css";

function SignIn() {
  const reviews = [
    "Our sales increased by 50% in the last month, making us the number one commerce site to have over 1000 users in less than a month",
    "Anime Monarck is amazing, all the products are exactly as shown",
    "They have a very good delivery system",
    "Their site works seamlessly",
    "Best website for buying anime merches and accessories, top notch stuff"
  ];

  const pictures  = ["stefan-unsplash.jpg", "vicky-unsplash.jpg", "michael-unsplash.jpg", "christian-unsplash.jpg", "ethan-unsplash.jpg"]
  const [review, setReview] = useState(0);
  const [reviewslide, setReviewSlide] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReview((current) => (current < reviews.length - 1 ? current + 1 : 0));
      setReviewSlide(!reviewslide);
    }, 3000);
  }, [review]);

  return (
    <section className={styles.signInSection}>
      <div className={styles.logo}>
        {" "}
        <div className={styles.logoPic}>
          <img src="/flare-high-resolution-logo-transparent.png" alt="" />
        </div>{" "}
        {/* <div>Anime Monarck</div> */}
      </div>
      <div className={styles.content}>
        <div className={styles.signInContainer}>
          <div className={styles.title}>Try Out Flare!</div>
          <div className={styles.btnContainer}>
            <div className={styles.btn}>
              {" "}
              <div>
                <img src="/icons8-google-logo-17.png" alt="" />
              </div>{" "}
              <div>SignUp / login with Google</div>
            </div>
            <div className={styles.btn}>
              <div>
                <img src="/icons8-linkedin-17.png" alt="" />
              </div>{" "}
              <div>SignUp / login with LinkedIn</div>
            </div>
          </div>

          <div className={styles.signEmailContainer}>
            <div className={styles.line}></div>
            <div className={styles.emailContent}>Or Signup using email</div>
            <div className={styles.line}></div>
          </div>

          <div className={styles.inputDiv}>
            <input type="email" required placeholder="Email" />
            <input type="password" required placeholder="Password" />
          </div>

          <div className={styles.termsDiv}>
            <input type="checkbox" required />
            <div className={styles.termsContent}>
              By creating an account you are agreeing to <br />
              our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
            </div>
          </div>

          <button className={styles.signupBtn}>Signup</button>

          <div className={styles.link}>
            <a href="#">Or Login using email</a>
          </div>
        </div>

        <div className={styles.reviewContainer}>
          <div className={styles.arrowDivOne}>
            <img src="/icons8-forward-31.png" alt="" />
          </div>

          <div
            className={`${!reviewslide && styles.testimonial} ${
              reviewslide && styles.testimonialGo
            }`}
          >
            <div className={styles.reviewContent}>{reviews[review]}</div>
            <div className={styles.reviewDiv}>
              <div className={styles.reviewerPicDiv}>
                <img src= {`/${pictures[review]}`} alt="" />
              </div>
              <div className={styles.reviewerName}>
                <div>{pictures[review].split("-")[0]}</div> <span>Orum</span>
              </div>

              <div className={styles.rating}>
                {" "}
                <img src="/icons8-star-24.png" alt="" />
                <img src="/icons8-star-24.png" alt="" />
                <img src="/icons8-star-24.png" alt="" />
                <img src="/icons8-star-24.png" alt="" />
                <img src="/icons8-star-24.png" alt="" />
              </div>
            </div>
          </div>

          <div className={styles.arrowDivTwo}>
            <img src="/icons8-forward-31.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
