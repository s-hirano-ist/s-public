# Experimental

Deployment of [frontend-experimental](https://github.com/s-hirano-ist/frontend-experimental), [rss-dumper](https://github.com/s-hirano-ist/rss-dumper), and [rss-dumper-graphql](https://github.com/s-hirano-ist/rss-dumper-graphql)

```mermaid
flowchart BT

subgraph Vercel
  subgraph Next["frontend-experimental (Next.js with Vercel Edge Networks)"]
    Prisma
    Auth.js
    Apollo["Yoga/Apollo client"]
  end
  blob[("Vercel Blob")]
  vPSQL["PostgreSQL"]
end
Apollo-->vPSQL
Prisma-->vPSQL

Next-->GAL
Next-->blob
Next-->|with openapi2aspida or untyped fetch|rss-dumper
Next-->|with GraphQL codegen or untyped fetch|rss-dumper-graphql
Auth.js-->|restrict user access|OAuth

subgraph Render
  subgraph rss-dumper["rss-dumper (Express)"]
    rPrisma["Prisma"]
    Passport
    SW["Swagger UI + tsoa"]
  end
  subgraph rss-dumper-graphql["rss-dumper-graphql (Apollo Server)"]
    Nexus
    gPrisma["Prisma"]
    GSH["GraphQL Shield + GraphQL middleware"]
  end
end

subgraph Supabase
  psql1["PostgreSQL 1"]
  psql2["PostgreSQL 2"]
end
rPrisma-->psql1
gPrisma-->psql2

User((User))-->GMO
subgraph GMO
  onamae{{"お名前.com"}}
end

GMO-->Next

subgraph GitHub
  GH{{"GitHub"}}-->|on code push|GA
  RV{{"Renovate"}}-->|weekly schedule|GA
  DA{{"Dependabot Alerts"}}-->|weekly schedule|GA
  subgraph GA["GitHub actions"]
    formatter
    linter
    test
  end
  VercelBot{{"Vercel Bot"}}
  OAuth{{"OAuth"}}
end
GA-->VercelBot

VercelBot-->|deploy|Next
VercelBot-->|deploy|rss-dumper
VercelBot-->|deploy|rss-dumper-graphql

subgraph Google
  GAL{{"Google Analytics"}}
end
```
