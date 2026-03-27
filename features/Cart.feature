Feature: Autenticação

  Scenario: Login com credenciais válidas
    Given que estou na página de login
    When preencho o usuário "standard_user" e a senha "secret_sauce"
    Then devo ser redirecionado para a lista de produtos

  Scenario: Login com credenciais inválidas
    Given que estou na página de login
    When preencho o usuário "usuario_errado" e a senha "senha_errada"
    Then devo ver a mensagem "Username and password do not match"

  Scenario: Login com usuário bloqueado
    Given que estou na página de login
    When preencho o usuário "locked_out_user" e a senha "secret_sauce"
    Then devo ver a mensagem "Sorry, this user has been locked out"


Feature: Produtos

  Scenario: Listar todos os produtos
    Given que estou logado no site
    Then devo ver a lista de produtos na tela

  Scenario: Ordenar produtos por menor preço
    Given que estou logado no site
    When ordeno os produtos por "Price (low to high)"
    Then o primeiro produto deve ser o mais barato

  Scenario: Ordenar produtos por nome A-Z
    Given que estou logado no site
    When ordeno os produtos por "Name (A to Z)"
    Then os produtos devem aparecer em ordem alfabética

  Scenario: Ver detalhes de um produto
    Given que estou logado no site
    When clico no produto "Sauce Labs Backpack"
    Then devo ver a página de detalhes com nome, descrição e preço


Feature: Carrinho de compras

  Scenario: Adicionar um produto ao carrinho
    Given que estou logado no site
    When adiciono o produto "Sauce Labs Backpack"
    Then o badge do carrinho deve mostrar "1"

  Scenario: Adicionar múltiplos produtos
    Given que estou logado no site
    When adiciono os produtos "Sauce Labs Backpack", "Sauce Labs Bike Light" e "Sauce Labs Bolt T-Shirt"
    Then o badge do carrinho deve mostrar "3"

  Scenario: Remover produto do carrinho
    Given que estou logado e tenho "Sauce Labs Backpack" no carrinho
    When removo o produto do carrinho
    Then o carrinho deve estar vazio

  Scenario: Carrinho persiste ao navegar entre páginas
    Given que estou logado e adicionei "Sauce Labs Bike Light" ao carrinho
    When navego de volta para a lista de produtos
    Then o badge do carrinho ainda deve aparecer

  Scenario: Adicionar produto, voltar e adicionar mais
    Given que estou logado no site
    When adiciono "Sauce Labs Backpack"
    And volto para a lista de produtos
    And adiciono "Sauce Labs Bike Light"
    Then o badge do carrinho deve mostrar "2"    


Feature: Checkout

  Scenario: Checkout completo com sucesso
    Given que estou logado e tenho um produto no carrinho
    When vou ao carrinho e clico em Checkout
    And preencho o formulário com nome "Jorge", sobrenome "Toledo" e CEP "37245000"
    And clico em Continue e depois em Finish
    Then devo ver a mensagem "Thank you for your order!"

  Scenario: Tentar fazer checkout com carrinho vazio
    Given que estou logado no site
    When vou direto para o carrinho sem adicionar produtos
    Then o botão de Checkout deve estar visível mas o carrinho vazio

  Scenario: Tentar continuar o formulário sem preencher os campos
    Given que estou logado e tenho um produto no carrinho
    When vou ao checkout e clico em Continue sem preencher nada
    Then devo ver a mensagem de erro "First Name is required"

  Scenario: Checkout com múltiplos produtos
    Given que estou logado no site
    When adiciono "Sauce Labs Backpack" e "Sauce Labs Bike Light" ao carrinho
    And finalizo o checkout com os dados válidos
    Then devo ver a mensagem "Thank you for your order!"    




Regra simples: cada spec testa só o que acontece naquela página.

auth.spec.ts — tudo relacionado a login e autenticação:

login com sucesso
login com credenciais inválidas
usuário bloqueado
logout


produtos.spec.ts — tudo relacionado à listagem de produtos:

listar todos os produtos
ordenar por preço
ordenar por nome
ver detalhes de um produto


carrinho.spec.ts — tudo relacionado ao carrinho:

adicionar produto
adicionar múltiplos produtos
remover produto
carrinho vazio
carrinho persiste ao navegar


checkout.spec.ts — tudo relacionado ao fluxo de compra:

checkout completo com sucesso
formulário sem preencher os campos
checkout com múltiplos produtos
cancelar o checkout


A pergunta que você se faz sempre é: "em qual página isso acontece?" — a resposta te diz em qual spec o cenário vai!    