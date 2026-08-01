<p align='center'>
<picture>
    <img alt="AILLA logo" src="./frontend/src/lib/assets/readme_logo.png">
</picture>
</p>

## About

<p align='justify'>
The AI Language Learning App (AILLA) is a tool that helps learning languages through short AI-generated stories in the targeted language. The current targeted language available to learn is German. At the beggining, a story is generated out of five randomly selected words from the vocabulary database. Every word of the story is clickable and is supported with an English translation, type (noun, verb, etc.), article if noun, and an example sentence that shows the word usage.

The linguistic information of the vocabulary appear in a pop-up window once the word is clicked. The selected words by the user indicate that their meaning is unknown and therefore they get highlighted to be reused in the next generated story. That helps the user see the words, that he/she does not know reimplemented in a new simple context to improve his/her language skills. In addition to the selected words, randomly picked vocabularies from the database get merged in the new story (if the number of selected words is less than five) to help forming new ideas in the story's context.

Each next story is saved automatically in the user's database (associated with his/her account) and also the current story with the selected words can be saved by the user. The user can remove the current displayed story with its selected words by clicking the `reset` button and generate a new story of randomly picked words from the database.

</p>

## Getting Started

To install the AILLA project on your system in the `Dev mode`, first clone the project

```bash
git clone https://gitlab.gwdg.de/webdev/2026/ki-generierte-geschichten-zum-sprache-lernen.git
cd ki-generierte-geschichten-zum-sprache-lernen
```

Create `.env` file where your credentials will be placed.

We use `bun` to install all needed packages and their dependencies. The AILLA website is divided into three parts; database, backend, and frontend.

### Database

- We use the dataset of the [1000 most common German words](https://www.kaggle.com/datasets/harounqer/1000-german-words) to randomly pick vocabularies from to generate the first story or the next stories.
- We use a locally hosted [Pocketbase](https://pocketbase.io/) server to store the vocabulary dataset, the user authentication information, and the user data from the dashboard.

Since the size of vocabulary data is relatively small (~15 kB), we already pushed it to the repository under the `data` directory. To get started with Pocketbase, you need to firstly build it in your system following the pocketbase installation guide, then open the local server

```bash
./pocketbase serve
```

Then, create a `_superuser` account in pocketbase to get started, and place you email and password in the `.env`file.

```bash
PB_EMAIL=""
PB_PASSWORD=""
```

We pushed the json files necessary to create the Pocketbase collections of the project. Basically, the user needs to import the json files in `Settings/Import collections` to have the collections configured.

Alternatively, the user can prepare the data and configure the collections from scratch to get more familiar with the API rules of each collection, if desired. The collapsed details are optional.

<details>

Download the vocabulary dataset from `Kaggle` and place it in the `data` directory, then run the following file to pre-process the dataset

```bash
python data/data_explore.py
```

#### Pocketbase Collections

1- Create the `vocaulary` collection of type `Base` with the following fields

```json
{
  "vocab_id": "numeric",
  "german": "text",
  "english": "text",
  "example_german": "text",
  "example_english": "text",
  "word_article": "text",
  "word_type": "json"
}
```

The following API rules should be set to enable only the authenticated and verified users to view or search the data, in case they have the database URL and wanted to access the recordings. Since the vocabulary data is shared among all users and does not contain any user-specific information the Create, Update or Delete rules should only be allowed by the `_superuser` who manages the application, and not by the regular users. Therefore, these rules should be left locked.

```json
{
  "List/Search rule": "@request.auth.id = id && @request.auth.verified = true",
  "View rule": "@request.auth.id = id && @request.auth.verified = true"
}
```

2- Create the `vocab_users` collection, where the user's credentials are stored after registeration. This collection has the type `Auth` with the following fields

```json
{
  "password": "password",
  "tokenKey": "text",
  "email": "email",
  "emailVisibility": "bool",
  "verified": "bool"
}
```

The `password` and `tokenKey` must be hidden and required, while the field `email` is required. The following API rules must be set to secure the user's credentials

```json
{
  "List/Search rule": "@request.auth.id = id && @request.auth.verified = true",
  "View rule": "@request.auth.id = id && @request.auth.verified = true",
  "Create rule": "empty",
  "Update rule": "Superusers only",
  "Delete rule": "@request.auth.id = id"
}
```

The first two rules allow the user to search/view his/her account only without accessing other accounts. The user must also be marked as `verified` through a valid registeration email-address to access his/her data.

The `Create rule` should not be restricted to enable everyone registers in the website, while the `Update rule` should be managed by the `_superuser` to avoid abuses or false entries in the database. Every registered user has the right to delete his/her account, whether verified or not.

3- Create the `vocab_user_data` of type `Base` to store the generated stories and the corresponding selected words by the user. This collection has the following fields

```json
{
  "offset_words": "json",
  "generated_story": "text",
  "user": "single relation to vocab_users"
}
```

This collection has the same API rules as the `vocab_users` except for the `Create rule` which must be locked for `_superusers` only to avoid manipulating the data or creating bad entries or unlawful story content.

</details>

To load the vocabulary data into the pocketbase collection and sort it according to the `vocab_id`, run

```bash
bun backend/src/pb_fill_vocabs.js
```

#### Pocketbase Settings

In the `Settings/Application` change the application name to `AILLA`. Configure the `Settings/Mail settings` to enable receiving emails from Pocketbase to either verify your account or to reset your password. Register in one of the providing SMTP server services (e.g. Brevo) and fill in your SMTP server access details. This is important so that the Pocketbase can communicate with the user. Then, click on `Send test email` to check if your configurations work as expected.
