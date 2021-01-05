import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/container';
import { Form, SubmitButton, List } from './styles';

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      loading: PropTypes.bool,
    }),
  }).isRequired,
};

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newRepo: '',
      repositories: [],
      loading: false,
      error: false,
      errorMsg: 'Repositório incorreto',
    };
  }

  // loading localStorage data
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // save localStorage data
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = (e) => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { newRepo, repositories } = this.state;

      const hasRepo = repositories.find((r) => r.name === newRepo);

      const duplicatedMessage = 'Repositório duplicado';
      if (hasRepo) throw duplicatedMessage;

      this.setState({
        loading: true,
        error: false,
        errorMsg: 'Repositório incorreto',
      });

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
      });
    } catch (err) {
      if (err === 'Repositório duplicado') {
        this.setState({ errorMsg: err });
      }
      this.setState({ error: true, loading: false });
    }
  };

  render() {
    const { newRepo, loading, repositories, error, errorMsg } = this.state;

    return (
      <>
        <Container>
          <h1>
            <FaGithubAlt />
            Repositórios
          </h1>

          <Form onSubmit={this.handleSubmit} error={error}>
            <div>
              <input
                type="text"
                placeholder="Adicionar repositório"
                value={newRepo}
                onChange={this.handleInputChange}
              />
              <SubmitButton loading={loading}>
                {loading ? (
                  <FaSpinner color="#FFF" size={14} />
                ) : (
                  <FaPlus color="#FFF" size={14} />
                )}
              </SubmitButton>
            </div>
            {error && <span>{errorMsg}</span>}
          </Form>

          <List>
            {repositories.map((repository) => (
              <li key={repository.name}>
                <span>{repository.name}</span>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  Detalhes
                </Link>
              </li>
            ))}
          </List>
        </Container>
      </>
    );
  }
}

Main.propTypes = propTypes;

export default Main;
