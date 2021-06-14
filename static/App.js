var contentNode = document.getElementById("contents");

const issues = [{
  id: 1,
  status: "Open",
  owner: "Ravan",
  created: new Date("2016-08-15"),
  effort: 5,
  completionDate: undefined,
  title: "Error in console when clicking Add"
}, {
  id: 2,
  status: "Assigned",
  owner: "Eddie",
  created: new Date("2016-08-16"),
  effort: 14,
  completionDate: new Date("2016-08-30"),
  title: "Missing bottom border on panel"
}];

class IssueFilter extends React.Component {
  render() {
    return React.createElement(
      "div",
      null,
      "This is a place holder for the issue filter"
    );
  }
}
class IssueTable extends React.Component {
  render() {
    const issueRows = this.props.issues.map(issue => React.createElement(IssueRow, { key: issue.id, issue: issue }));

    const borderStyle = { border: "1px solid silver", padding: 6 };
    return React.createElement(
      "table",
      { style: { borderCollapse: "collapse" } },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            { style: borderStyle },
            "ID"
          ),
          React.createElement(
            "th",
            { style: borderStyle },
            "Status"
          ),
          React.createElement(
            "th",
            { style: borderStyle },
            "Owner"
          ),
          React.createElement(
            "th",
            { style: borderStyle },
            "Created"
          ),
          React.createElement(
            "th",
            { style: borderStyle },
            "Effort"
          ),
          React.createElement(
            "th",
            { style: borderStyle },
            "Completion Date"
          ),
          React.createElement(
            "th",
            { style: borderStyle },
            "Issue Title"
          )
        )
      ),
      React.createElement(
        "tbody",
        null,
        issueRows
      )
    );
  }
}
/* function IssueTable(props) {
  const issueRows = props.issues.map(issue =><IssueRow 
key={issue.id} issue={issue} />);
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Completion Date</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>{issueRows}</tbody>
    </table>
  );
} */
class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.issueAdd;
    this.props.createIssue({
      owner: form.owner.value,
      title: form.title.value,
      status: 'New',
      created: new Date()
    });
    form.owner.value = "";
    form.title.value = "";
  }
  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "form",
        { name: "issueAdd", onSubmit: this.handleSubmit },
        React.createElement("input", { type: "text", name: "owner", placeholder: "Owner" }),
        React.createElement("input", { type: "text", name: "title", placeholder: "Title" }),
        React.createElement(
          "button",
          null,
          "Add"
        )
      )
    );
  }
}
class IssueRow extends React.Component {
  render() {
    const borderStyle = { border: "1px solid silver", padding: 4 };
    const issue = this.props.issue;
    console.log('something');
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "td",
        { style: borderStyle },
        issue.id
      ),
      React.createElement(
        "td",
        { style: borderStyle },
        issue.status
      ),
      React.createElement(
        "td",
        { style: borderStyle },
        issue.owner
      ),
      React.createElement(
        "td",
        { style: borderStyle },
        issue.created.toDateString()
      ),
      React.createElement(
        "td",
        { style: borderStyle },
        issue.effort
      ),
      React.createElement(
        "td",
        { style: borderStyle },
        issue.completionDate ? issue.completionDate.toDateString() : ""
      ),
      React.createElement(
        "td",
        { style: borderStyle },
        issue.title
      )
    );
  }
}
/* const IssueRow = (props) => (
  <tr>
    <td>{props.issue.id}</td>
    <td>{props.issue.status}</td>
    <td>{props.issue.owner}</td>
    <td>{props.issue.created.toDateString()}</td>
    <td>{props.issue.effort}</td>
    <td>{props.issue.completionDate ?
props.issue.completionDate.toDateString() : ''}</td>
    <td>{props.issue.title}</td>
  </tr>
) */
IssueRow.propTypes = {
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string
};
IssueRow.defaultProps = {
  issue_title: "--- No title ---"
};
class BorderWrap extends React.Component {
  render() {
    const borderedStyle = { border: "1px solid silver", padding: 6 };
    return React.createElement(
      "div",
      { style: borderedStyle },
      this.props.children
    );
  }
}
class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: []
    };
    // this.createTestIssue = this.createTestIssue.bind(this)
    this.createIssue = this.createIssue.bind(this);
    // setTimeout(() => {this.createTestIssue()}, 2000);
    // setTimeout(this.createTestIssue, 2000);
  }
  componentDidMount() {
    this.loadData();
  }
  loadData() {
    setTimeout(() => {
      this.setState({
        issues: issues
      });
    }, 500);
  }
  createIssue(newIssue) {
    const newIssues = this.state.issues.slice();
    newIssue.id = this.state.issues.length + 1;
    newIssues.push(newIssue);
    this.setState({ issues: newIssues });
  }
  // createTestIssue() {
  //   this.createIssue({
  //     status: "New",
  //     owner: "Solomon",
  //     created: new Date(),
  //     effort: 7,
  //     title: "Completion date should be optional"
  //   });
  // }
  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        "Issue Tracker"
      ),
      React.createElement(IssueFilter, null),
      React.createElement("hr", null),
      React.createElement(IssueTable, { issues: this.state.issues }),
      React.createElement("hr", null),
      React.createElement(
        BorderWrap,
        null,
        React.createElement(IssueAdd, { createIssue: this.createIssue })
      )
    );
  }
}

ReactDOM.render(React.createElement(IssueList, null), contentNode); // Render the component inside the content Node