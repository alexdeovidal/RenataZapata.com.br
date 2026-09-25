# RZ Maquiagens

Site estático para a loja RZ Maquiagens, com sacolinha local e finalização do pedido pelo WhatsApp. Pronto para publicar no Coolify via Dockerfile.

## Rodar localmente

```bash
python3 -m http.server 8080
```

Acesse `http://localhost:8080`.

## Publicar no Coolify

1. Conecte este repositório ao Coolify.
2. Escolha **Dockerfile** como método de build.
3. O contêiner escuta na porta **80**.
4. Configure o domínio e HTTPS no Coolify.

## Atualizar produtos

Edite o array `products` em `shop.js`. Cada produto tem `id`, `name`, `brand`, `category`, `image`, `description`, `source` e `tag`. Salve a imagem otimizada na pasta `assets/` e use o nome do arquivo no campo `image`. O pedido usa os nomes e quantidades desse catálogo.

O WhatsApp da loja está na constante `WHATSAPP` no topo de `shop.js`. Os links Instagram e TikTok estão em `index.html`.

## Dados do catálogo

O catálogo inicial foi montado a partir de publicações e destaques públicos do Instagram `@loja.rz.maquiagens` em 25/09/2026. O campo `source` aponta para a publicação de cada item. As imagens de produtos, modelos e loja foram copiadas dessas publicações para evitar links temporários do Instagram.

O Instagram não fornece uma relação completa e atualizada de SKUs, preços, tons e estoque. Por isso o site mostra **Valor sob consulta** e o pedido é confirmado pela equipe no WhatsApp antes de qualquer pagamento. Acrescente os demais produtos após conferir nomes, variantes, fotos, preços e disponibilidade com a loja.

Não há checkout com pagamento online, cadastro de cliente ou coleta de dados em servidor. A sacolinha é salva somente no navegador do visitante.
