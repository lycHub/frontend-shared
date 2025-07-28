import axios from "axios";
import { postDetail } from "../../apis";
import { logger } from "@frontend-shared/libs";
import { useExtendTranslation } from "../../hooks/use-extend-translation";
function AutoDts() {
  const { t } = useExtendTranslation();
  const onClick = () => {
    postDetail(1)
      .then(({ data }) => {
        console.log("data", data);
        if (import.meta.env.DEV) {
          axios.post("/gen-dts", { posts: data });
        }
      })
      .catch((error) => {
        logger.error(error);
      });
  };

  return (
    <div className="dts-page">
      <h3>Auto dts</h3>
      <div className="i18n-box">
        <span>{t("查看")}</span>
        <span>{t("借调单")}</span>
      </div>
      <button onClick={onClick}>send request</button>
    </div>
  );
}

AutoDts.displayName = "AutoDts";
export default AutoDts;
