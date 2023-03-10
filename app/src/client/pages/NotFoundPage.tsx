import * as css from "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <div className={css.stretched}>
        <div className={css.centered}>
          <div className={css.logo}>
            <div className={css.logoLabel}>404</div>
          </div>
          <div className={css.description}>Page Not Found</div>
        </div>
      </div>
    </div>
  );
}
