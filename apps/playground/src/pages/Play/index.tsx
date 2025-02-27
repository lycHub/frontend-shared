import "./style.scss";
import { Icon } from "@iconify-icon/react";

function Play() {
  return (
    <div className="play-page">
      <h3>Play here</h3>
      <Icon icon="ri:armchair-fill" />
      <Icon icon="ri:armchair-fill" style={{ color: '#e00' }} />
      <Icon icon="ri:armchair-fill" style={{ color: '#e00', fontSize: '2em' }} />
      <Icon icon="ri:armchair-fill" style={{ color: '#e00', fontSize: '2em' }} rotate={45} />

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
