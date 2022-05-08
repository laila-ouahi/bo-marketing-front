# CER - ENTREE EN RELATION

## Architecture globale actuelle

```

                                        .----->  [branches de dev]
                          Master ->  develop ->  [branches de dev]
                             |          |----->  [branches de dev]
                             |          !----->  [branches de dev]
                             |
                             |
                             ---->  tag-v-0.0.1
                                        |
                                        ---->  tag-v-0.0.2   [les tags: versions deployer en production  ]
                                                   |
                                                  ...
                                                    ---->  tag-v-[x].[y].[z]
```

## Pipelines

- develop : build le projet et le dépose dans /opt/eer-api/frontDev
- master : copie la version de /opt/eer-api/frontDev et le dépose dans /opt/eer-api/front
- production : build le projet en https et le dépose dans /opt/eer-api/frontProd
- preproduction : build le projet et le dépose dans /opt/eer-api/frontPreProd

## PROCESS DE DEPLOIEMENT

### pour ajouter des modifications pour la version en recette :

- créer une branche de develop
- ajouter les modifications à cette branche
- merge les modifications dans develop
- attendre le pipeline develop
- supprimer la branche
- merge develop dans master
- attendre le pipline master
- consulter le projet sur 10.9.120.140:80

### pour faire un bug fixing de la production:

- savoir le dernier tag créé : on suppose que notre dernier tag est nommé tag-v-1.0.[n]
- créer une nouvelle branche du dernier tag avec le nom branche-tag-v-1.0.[n]-bug-fixing
- créer une nouvelle branche de la branche bug fixing avec le nom branche-tag-v-1.0.[n]-[bug à fixer ]
- ajouter les modifications à cette branche [creer une branche pour chaque anomalie]
- merge les modifications dans branche-tag-v-1.0.[n]-bug-fixing
- créer une nouvelle branche preproduction à partir de la branche branche-tag-v-1.0.[n]-bug-fixing
- attendre le pipline preproduction
- consulter le projet sur 10.9.120.140:83
- créer une nouvelle branche production à partir de la branche preproduction
- attendre le pipline production
- consulter le projet sur 10.9.120.140:81 [ne sera pas accessible vu le https ]
- creer un tag a partir de branche-tag-v-1.0.[n]-bug-fixing avec le nom tag-v-1.0.[n+1]
- supprimer la branche preproduction
- supprimer la branche production
- supprimer les branche-tag-\*

### pour deployer en prod :

- il suffit de remplacer de dossier frontProd de la prod par /opt/eer-api/frontProd
- un paramétrage d'environnement est essentiel et se fait comme suivant :

```
  REACT_APP_EER_BACKEND_PROXY_URL= [adresse-api]
  REACT_APP_EER_VERSION=[version-du-tag+1]  exemple : "1.0.[n+1]"
```
