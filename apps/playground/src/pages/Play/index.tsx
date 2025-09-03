import { useExtendTranslation } from "../../hooks/use-extend-translation";
import "./style.scss";
import { Icon } from "@iconify-icon/react";

function Play() {
  const { t } = useExtendTranslation();
  return (
    <div className="play-page">
      <h3>Play here</h3>
      <div className="i18n-box">
        <p>{t("工号")}</p>
        <p>{t("请输入新密码")}</p>
        <p>{t("中文")}</p>
      </div>

      <Icon icon="ri:angularjs-fill" style={{ color: 'orange', fontSize: '3em' }} />
      <hr />
      <Icon icon="zs:search" style={{ color: 'orange', fontSize: '3em' }} />
    </div>
  );
}

Play.displayName = "Play";
export default Play;
