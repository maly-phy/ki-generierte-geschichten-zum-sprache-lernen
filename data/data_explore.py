import pandas as pd

def shuffle_df():
    df= pd.read_excel("data/output.xlsx")
    df= df.sample(frac=1).reset_index(drop=True)
    df['vocab_id'] = range(1, len(df) +1)
    df.to_csv("data/vocabs_shuffled.csv", index=False)
    return df

def clean_df():
    df= pd.read_csv("data/vocabs_shuffled.csv")
    dups= df.duplicated(subset=['german'], keep=False)
    if dups.any():
        # print(df.loc[dups, ['german', 'english']].sort_values(by='german'))
        df.drop_duplicates(subset=['german'], keep='first', inplace=True)
    df['vocab_id'] = range(1, len(df) +1)
    df.reset_index(drop=True, inplace=True)
    df.to_csv("data/vocabs_shuffled.csv", index=False)
    return df

if __name__ == "__main__":
    df= pd.read_csv("data/vocabs_shuffled.csv")
    print(df.isnull().sum())