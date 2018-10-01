import * as React from "react";
import { PropertyControls, ControlType } from "framer";

interface Props {
    title: string;
}

interface State {
  title: string;
  image: string;
}

export class New extends React.Component<Props> {

    // Set default properties
    static defaultProps = {
    title: "Title",
    image: "",
    }

    // Items shown in property panel
    static propertyControls: PropertyControls = {
    title: { type: ControlType.String, title: "Text" },
    }

    state: State = {
      title: New.defaultProps.title,
      image: New.defaultProps.image,
    };

    componentDidMount() {
      const url = "https://cdn.glitch.com/0d930e86-c17b-441c-93f4-ce8e2ffa200c%2Fdata.json?1538140367036"
        fetch(url)
        .then(response => response.json())
        .then(response => this.setState({ title: response.title, image: response.image }))
  }

    render() {

    return <div>
      <img style={{width: 40, height: 40}} src={this.state.image} alt=""/>
      <div>{this.state.title}</div>
    </div>;
    }
}
