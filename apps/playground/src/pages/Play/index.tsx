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
      <Icon icon="ri:armchair-fill" />
      <Icon icon="ri:armchair-fill" style={{ color: "#e00" }} />
      <Icon
        icon="ri:armchair-fill"
        style={{ color: "#e00", fontSize: "2em" }}
      />
      <Icon
        icon="ri:armchair-fill"
        style={{ color: "#e00", fontSize: "2em" }}
        rotate={45}
      />

      <hr />

      <Icon icon="zs:search" style={{ color: "blue" }} />
      <Icon icon="zs:shopping" style={{ color: "red" }} />
      <Icon icon="zs:user" style={{ color: "yellow", fontSize: "24px" }} />
      <Icon icon="zs:pavilion-fill" style={{ color: "#f60" }} />
    </div>
  );
}

Play.displayName = "Play";
export default Play;
