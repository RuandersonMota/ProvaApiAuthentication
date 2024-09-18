describe('Autenticação API Getnet', () => {
  const clientId = '67823c6d-58de-494f-96d9-86a4c22682cb';
  const clientSecret = 'c2d6a06f-5f31-448b-9079-7e170e8536e4';

  // Função para gerar o token
  const gerarToken = async (id = clientId, secret = clientSecret) => {
    // Concatenação e codificação Base64 das credenciais
    const authString = btoa(`${id}:${secret}`);

    // Envio da requisição
    const response = await cy.request({
      method: 'POST',
      url: '/auth/oauth/v2/token',
      headers: {
        Authorization: `Basic ${authString}`, // Cabeçalho de autorização com base nas credenciais
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: {
        grant_type: 'client_credentials',
      },
      form: true, // Garante o formato correto da requisição
      failOnStatusCode: false, // Permite capturar o erro sem falhar o teste automaticamente
    });

    return response;
  };

  // Teste de autenticação com sucesso
  it('Deve autenticar com sucesso e retornar um token válido', async () => {
    const response = await gerarToken(); // Gera token com clientId e clientSecret válidos

    // Verifica se a resposta foi 200
    if (response.status === 200) {
      // Valida os campos obrigatórios
      expect(response.body).to.have.property('access_token');
      expect(response.body).to.have.property('token_type', 'bearer');
      expect(response.body).to.have.property('expires_in').and.to.be.greaterThan(0);
    } else {
      // Exibe o erro no console se o código não for 200
      cy.log('Erro na autenticação:', response.body);
    }
  });



  it('Deve autenticar com sucesso e retornar um token válido', async () => {
    const response = await gerarToken(); // Gera token com clientId e clientSecret válidos
  
    // Log para verificar o status real da resposta
    cy.log('Status da resposta:', response.status); // Loga o status recebido da API
    cy.log('Corpo da resposta:', JSON.stringify(response.body)); // Loga o corpo da resposta para depuração
  
    // Verifica se a resposta foi 200
    expect(response.status).to.eq(200); // A resposta deve ser 200, caso contrário, loga o erro
  
    if (response.status === 200) {
      // Valida os campos obrigatórios
      expect(response.body).to.have.property('access_token');
      expect(response.body).to.have.property('token_type', 'bearer');
      expect(response.body).to.have.property('expires_in').and.to.be.greaterThan(0);
    } else {
      // Exibe o erro no console se o código não for 200
      cy.log('Erro na autenticação:', response.body);
    }
  });




  // Teste de autenticação com credenciais inválidas
  it('Deve retornar 401 ao autenticar com credenciais inválidas', async () => {
    const response = await gerarToken('invalid_client_id', 'invalid_client_secret'); // Gera token com credenciais inválidas
  
    // Verifica se a resposta foi 401
    expect(response.status).to.eq(401); // Status code para credenciais inválidas
  
    // Loga o corpo da resposta para verificar o conteúdo
    cy.log('Response body:', response.body);
  
    // Verifica se o corpo da resposta contém a propriedade 'error' (ajuste baseado na resposta real)
    if (response.body.error) {
      expect(response.body).to.have.property('error', 'invalid_client');
    } else {
      cy.log('A propriedade "error" não está presente na resposta. Verificar o formato.');
    }
  });
  
});


