import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaSpinner, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import api from '../../services/api';

import { Loading, Owner, IssueList, Header, Footer } from './styles';
import Container from '../../components/container';

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
      page: PropTypes.number,
    }),
  }).isRequired,
};

class Repository extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repository: {},
      issues: [],
      loading: true,
      status: 'open',
      page: 1,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { status, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: status,
          page,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadIssues = async () => {
    const { match } = this.props;
    const { status, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: status,
        per_page: 5,
        page,
      },
    });

    this.setState({ issues: response.data });
  };

  handlePageNavigate = async (action) => {
    const { page } = this.state;
    await this.setState({
      page: action === 'back' ? page - 1 : page + 1,
    });

    this.loadIssues();
  };

  handleChange = async (e) => {
    e.preventDefault();
    await this.setState({
      status: e.target.value,
    });

    this.loadIssues();
  };

  preventSubmit = async (e) => {
    e.preventDefault();
  };

  render() {
    const { repository, issues, loading, status, page } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaSpinner color="#FFF" size={28} />
        </Loading>
      );
    }

    return (
      <>
        <Container>
          <Header>
            <Link to="/">
              <FaArrowLeft color="#7159c1" size={18} />
              Voltar aos repositórios.
            </Link>
            <select value={status} onChange={(e) => this.handleChange(e)}>
              <option value="open">Open</option>
              <option value="all">All</option>
              <option value="closed">Closed</option>
            </select>
          </Header>
          <Owner>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <h1>{repository.name}</h1>
            <p>{repository.description}</p>
          </Owner>

          <IssueList>
            {issues.map((issue) => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map((label) => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))}
          </IssueList>
          <Footer>
            <form onSubmit={(e) => this.preventSubmit(e)}>
              <button type="submit" disabled={page < 2}>
                <FaArrowLeft
                  disabled
                  size={22}
                  color="#FFF"
                  onClick={() => this.handlePageNavigate('back')}
                />
              </button>
              <button type="submit">
                <FaArrowRight
                  size={22}
                  color="#FFF"
                  onClick={() => this.handlePageNavigate('next')}
                />
              </button>
            </form>
          </Footer>
        </Container>
      </>
    );
  }
}

Repository.propTypes = propTypes;

export default Repository;
