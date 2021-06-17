var contentNode = document.getElementById("contents");
/* const issues = [
  {
    id: 1,
    status: "Open",
    owner: "Ravan",
    created: new Date("2016-08-15"),
    effort: 5,
    completionDate: undefined,
    title: "Error in console when clicking Add",
  },
  {
    id: 2,
    status: "Assigned",
    owner: "Eddie",
    created: new Date("2016-08-16"),
    effort: 14,
    completionDate: new Date("2016-08-30"),
    title: "Missing bottom border on panel",
  },
]; */

class IssueFilter extends React.Component {
  render() {
    return <div>This is a place holder for the issue filter</div>;
  }
}
class IssueTable extends React.Component {
  render() {
    const issueRows = this.props.issues.map((issue) => (
      <IssueRow key={issue._id} issue={issue} />
    ));

    const borderStyle = { border: "1px solid silver", padding: 6 };
    return (
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={borderStyle}>ID</th>
            <th style={borderStyle}>Status</th>
            <th style={borderStyle}>Owner</th>
            <th style={borderStyle}>Created</th>
            <th style={borderStyle}>Effort</th>
            <th style={borderStyle}>Completion Date</th>
            <th style={borderStyle}>Issue Title</th>
          </tr>
        </thead>
        <tbody>
          {/* <IssueRow issue_id={1}>
            Error in the console when clicking add
          </IssueRow>
          <IssueRow issue_id={2}>
            Missing bottom <b>border</b> on the panel
          </IssueRow>
          <IssueRow issue_id={3}>This used to be empty</IssueRow> */}
          {issueRows}
        </tbody>
      </table>
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
      status: "New",
      created: new Date(),
    });
    form.owner.value = "";
    form.title.value = "";
  }
  render() {
    return (
      <div>
        <form name="issueAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="owner" placeholder="Owner" />
          <input type="text" name="title" placeholder="Title" />
          <button>Add</button>
        </form>
      </div>
    );
  }
}
/* class IssueRow extends React.Component {
  render() {
    const borderStyle = { border: "1px solid silver", padding: 4 };
    const issue = this.props.issue;
    console.log("something");
    return (
      <tr>
        <td style={borderStyle}>{issue.id}</td>
        <td style={borderStyle}>{issue.status}</td>
        <td style={borderStyle}>{issue.owner}</td>
        <td style={borderStyle}>{issue.created.toDateString()}</td>
        <td style={borderStyle}>{issue.effort}</td>
        <td style={borderStyle}>
          {issue.completionDate ? issue.completionDate.toDateString() : ""}
        </td>
        <td style={borderStyle}>{issue.title}</td>
      </tr>
    );
  }
} */
const IssueRow = (props) => (
  <tr>
    <td>{props.issue._id}</td>
    <td>{props.issue.status}</td>
    <td>{props.issue.owner}</td>
    <td>{props.issue.created.toDateString()}</td>
    <td>{props.issue.effort}</td>
    <td>
      {props.issue.completionDate
        ? props.issue.completionDate.toDateString()
        : ""}
    </td>
    <td>{props.issue.title}</td>
  </tr>
);
// IssueRow.propTypes = {
//   id: React.PropTypes.number.isRequired,
//   title: React.PropTypes.string,
// };
// IssueRow.defaultProps = {
//   issue_title: "--- No title ---",
// };
class BorderWrap extends React.Component {
  render() {
    const borderedStyle = { border: "1px solid silver", padding: 6 };
    return <div style={borderedStyle}>{this.props.children}</div>;
  }
}
class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      issues: [],
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
    // setTimeout(() => {
    //   this.setState({
    //     issues: issues
    //   })
    // }, 500)

    fetch("http://localhost:3000/api/issues")
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log("Total count of records:", data._metadata.total_count);
            data.records.forEach((issue) => {
              issue.created = new Date(issue.created);
              if (issue.completionDate)
                issue.completionDate = new Date(issue.completionDate);
            });
            this.setState({ issues: data.records });
          });
        } else {
          response.json().then((error) => {
            alert("Failed to fetch issues:" + error.message);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  createIssue(newIssue) {
    // const newIssues = this.state.issues.slice();
    // newIssue.id = this.state.issues.length + 1;
    // newIssues.push(newIssue);
    // this.setState({ issues: newIssues });

    fetch("http://localhost:3000/api/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newIssue),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((updatedIssue) => {
            updatedIssue.created = new Date(updatedIssue.created);
            if (updatedIssue.completionDate)
              updatedIssue.completionDate = new Date(
                updatedIssue.completionDate
              );
            const newIssues = this.state.issues.concat(updatedIssue);
            this.setState({ issues: newIssues });
          });
        } else {
          response.json().then((error) => {
            alert("Failed to add issue: " + error.message);
          });
        }
      })
      .catch((err) => {
        alert("Error in sending the data to the server: " + err.message);
      });
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
    return (
      <div>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues} />
        {/* <button onClick={this.createTestIssue}>Add</button> */}
        <hr />
        <BorderWrap>
          <IssueAdd createIssue={this.createIssue} />
        </BorderWrap>
      </div>
    );
  }
}

ReactDOM.render(<IssueList />, contentNode); // Render the component inside the content Node
