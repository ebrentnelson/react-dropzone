/**
 * @jsx React.DOM
 */

var React = require('react');

var Dropzone = React.createClass({
  getInitialState: function() {
    return {
      isDragActive: false
    }
  },

  handleDragLeave: function(e) {
    this.setState({
      isDragActive: false
    });
  },

  handleDragOver: function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";

    this.setState({
      isDragActive: true
    });
  },

  handleDrop: function(e) {
    e.preventDefault();

    this.setState({
      isDragActive: false
    });

    if (this.props.handler) {
      var files = e.dataTransfer && e.dataTransfer.files;
      this.props.handler(files);
    } else {
      console.error('No handler specified to accept the dropped file.');
    }
  },

  handleClick: function(e) {
    var fileUpload = this.refs['file-upload'].getDOMNode();
    fileUpload.value = null;
    fileUpload.click();
  },

  handleOnChange: function(e) {
    if (this.props.handler) {
      var files = e.target && e.target.files;
      this.props.handler(files);
    } else {
      console.error('No handler specified to accept the dropped file.');
    }
  },

  render: function() {

    var size = this.props.size || "100pt";
      var dropzoneStyle = this.props.children ? {} : {
        width: size,
        height: size,
        borderRadius: "10%",
        borderWidth: "2pt",
        borderColor: "#666",
        borderStyle: this.state.isDragActive ? "solid" : "dashed"
      };

      var messageStyle = {
        display: "table-cell",
        width: size,
        height: size,
        textAlign: "center",
        verticalAlign: "middle",
        fontSize: "10pt",
        textTransform: "uppercase",
        color: "#666"
      };

    return (
      <div className="dropzone" style={dropzoneStyle} onDragLeave={this.handleDragLeave} onDragOver={this.handleDragOver} onDrop={this.handleDrop} onClick={this.handleClick}>
        {this.props.children || <span style={messageStyle}>{this.props.message || "Drop Here"}</span>}
        <input ref="file-upload" type="file" style={{visibility:"hidden", display: "none"}} onChange={this.handleOnChange} />
      </div>
    );
  }

});

module.exports = Dropzone;
