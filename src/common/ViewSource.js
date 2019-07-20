import React from 'react';
import './ViewSource.css';

class ViewSource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {button: "View Source"};
    this.handleViewSource = this.handleViewSource.bind(this);
  }

  change(source, regex) {
    let URL = window.location.origin;
    let matches;
    while ((matches = regex.exec(source)) !== null) {
      let replace = matches[0];
      let value = matches[1] + matches[2];
      replace = replace.replace(value, URL + value);
      console.log("replacing:", matches[0], "=to=", replace);
      source = source.replace(matches[0], replace);
    }
    return source;
  }

  updateLinks(source) {
    let regex = /href="(\/)([^"]+)"/;
    source = this.change(source, regex);
    regex = /src="(\/)([^"]+)"/;
    source = this.change(source, regex);
    regex = /.p="(\/)([^"]+)"/;
    source = this.change(source, regex);
    const btn = '<button>View Source</button>';
    source = source.replace(btn, '');
    return source;
  }

  handleViewSource(e) {
    e.preventDefault();
    if (this.state.button === "Hide Source") {
      const el = document.getElementsByClassName("ViewSource")[0];
      el.remove();
      this.setState({button: 'View Source'});
      return;
    }
    const button = e.target;
    const parent = button.parentElement;
    let code = document.createElement('textarea');
    let source = "<!DOCTYPE html><html>";
    code.className = "ViewSource";
    code.rows = 16;
    source += document.getElementsByTagName('html')[0].innerHTML;
    source += "</html>";
    source = this.updateLinks(source);
    source = source.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    code.innerHTML = source;
    parent.insertBefore(code, button);
    this.setState({button: 'Hide Source'});
  }

  render() {
    return <button className="ViewSource-button" onClick={this.handleViewSource}>{this.state.button}</button>;
  }
}

export default ViewSource;
