import * as React from "react";
import { Frame, Size, PropertyControls, ControlType } from "framer";

interface Props extends Size {
  background: string;
  color: string;
  name: string;
  region: string;
  title: number;
  subtitle: number;
  avatar: number;
  mode: string;
}

interface State {
  name: string;
  surname: string;
  photo: string;
  randomRegion: string;
}

export class Profile extends React.Component<Partial<Props>, State> {
  xhttp?: XMLHttpRequest;

  static defaultProps = {
    width: 200,
    height: 200,
    name: "",
    surname: "",
    region: "United States",
    photo: "",
    background: "#fff",
    color: "#000",
    randomRegion: "",
    title: 15,
    subtitle: 13,
    avatar: 50,
    mode: true,
  };

  static propertyControls: PropertyControls<Props> = {
    region: { type: ControlType.String, title: "Region" },
    mode: {
      type: ControlType.Boolean,
      enabledTitle: "Grid",
      disabledTitle: "List",
      title: "Mode",
    },
    background: { type: ControlType.Color, title: "Background" },
    color: { type: ControlType.Color, title: "Text" },
    title: { type: ControlType.Number, title: "Title" },
    subtitle: { type: ControlType.Number, title: "Subtitle" },
    avatar: { type: ControlType.Number, title: "Avatar" },
  };

  state: State = {
    name: Profile.defaultProps.name,
    surname: Profile.defaultProps.surname,
    photo: Profile.defaultProps.photo,
    randomRegion: Profile.defaultProps.randomRegion,
  };

  loadData = (url, callback) => {
    if (this.xhttp) {
      this.xhttp.abort();
    }
    const xhttp = (this.xhttp = new XMLHttpRequest());
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        const response = JSON.parse(xhttp.responseText);
        callback(response);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  };

  componentDidMount() {
    let string = `https://uinames.com/api/?ext&region=${
      this.props.region
    }&random=${Math.random()}`;

    if (this.props.region == "") {
      string = `https://uinames.com/api/?ext&random=${Math.random()}`;
    }

    this.loadData(string, response => {
      this.setState({
        name: response.name,
        surname: response.surname,
        photo: response.photo,
        randomRegion: response.region,
      });
    });
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.region !== prevProps.region) {
      let string = `https://uinames.com/api/?ext&region=${
        this.props.region
      }&random=${Math.random()}`;

      if (this.props.region == "") {
        string = `https://uinames.com/api/?ext&random=${Math.random()}`;
      }

      this.loadData(string, response => {
        this.setState({
          name: response.name,
          surname: response.surname,
          photo: response.photo,
        });
      });
    }
  }
  componentWillUnmount() {
    if (this.xhttp) {
      this.xhttp.abort();
    }
  }

  render() {
    var name = this.state.name;
    var surname = this.state.surname;
    var region = this.props.region;
    var photo = this.state.photo;

    if (this.props.region == "") {
      region = this.state.randomRegion;
    }

    return (
      <Frame
        width={this.props.width}
        height={this.props.height}
        background={this.props.background}
      >
        <div
          style={{
            ...style,
            color: this.props.color,
            flexDirection: this.props.mode ? "column" : "row",
            textAlign: this.props.mode ? "center" : "left",
          }}
        >
          <img
            src={photo}
            style={{
              borderRadius: "50%",
              width: this.props.avatar,
              height: this.props.avatar,
            }}
          />

          <div
            style={{
              marginLeft: this.props.mode ? 0 : 20,
              marginTop: this.props.mode ? 0 : -14,
            }}
          >
            <h1 style={{ ...header, fontSize: this.props.title }}>
              {name} {surname}
            </h1>
            <h2 style={{ ...subheader, fontSize: this.props.subtitle }}>
              {region}
            </h2>
          </div>
        </div>
      </Frame>
    );
  }
}

const header: React.CSSProperties = {
  margin: "20px auto 5px auto",
};

const subheader: React.CSSProperties = {
  fontWeight: 300,
  opacity: 0.5,
  margin: 0,
};

const style: React.CSSProperties = {
  fontFamily: "system-ui",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
};
