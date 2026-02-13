CREATE TABLE Users (
    UserId STRING(36) NOT NULL,
    Username STRING(100) NOT NULL,
    Role STRING(20) NOT NULL,
    ReputationScore INT64 NOT NULL,
    WalletBalance NUMERIC NOT NULL
) PRIMARY KEY (UserId);

CREATE TABLE Messages (
    MessageId STRING(36) NOT NULL,
    Content STRING(MAX) NOT NULL,
    SenderId STRING(36) NOT NULL,
    ChannelId STRING(50),
    Type STRING(20),
    Timestamp TIMESTAMP NOT NULL
) PRIMARY KEY (MessageId);

CREATE TABLE MeritScores (
    UserId STRING(36) NOT NULL,
    TotalScore INT64 NOT NULL,
    LastUpdated TIMESTAMP NOT NULL
) PRIMARY KEY (UserId);

CREATE TABLE Trades (
    TradeId STRING(36) NOT NULL,
    BuyerId STRING(36) NOT NULL,
    SellerId STRING(36) NOT NULL,
    Amount NUMERIC NOT NULL,
    Status STRING(20) NOT NULL,
    CreatedAt TIMESTAMP NOT NULL
) PRIMARY KEY (TradeId);

CREATE TABLE Escrow (
    EscrowId STRING(36) NOT NULL,
    ReleaseDate TIMESTAMP NOT NULL,
    IsDisputed BOOL NOT NULL
) PRIMARY KEY (EscrowId);

CREATE TABLE Gigs (
    GigId STRING(36) NOT NULL,
    Title STRING(MAX) NOT NULL,
    Price NUMERIC NOT NULL,
    Location STRING(MAX) NOT NULL,
    Type STRING(20) NOT NULL,
    UserId STRING(36) NOT NULL,
    Status STRING(20) NOT NULL,
    CreatedAt TIMESTAMP NOT NULL
) PRIMARY KEY (GigId);

CREATE TABLE Followers (
    FollowerId STRING(36) NOT NULL,
    TargetId STRING(36) NOT NULL,
    Timestamp TIMESTAMP NOT NULL
) PRIMARY KEY (FollowerId, TargetId);
