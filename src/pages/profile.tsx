import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import styled from "styled-components";

import { Button, ActiveBidtem } from "@components";
import { config } from "@constants";
import { useLazyMojito, useFetchAfterAuth } from "@hooks";
import { EMojitoQueries } from "@state";
import Content from "metaverso.content.json";

const Main = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 92px 30px;
`;

const TopContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const User = styled.div(
  ({ theme }) => `
  border: ${theme.borders.medium(theme.colors.primary)};
  border-radius: ${theme.borderRadius.large};
  display: flex;
  flex-direction: column;
  max-width: 1114px;
  padding: 24px 27px 40px 42px;
  position: relative;
  width: 100%;

  ${theme.down(theme.breakpoints.sm)} {
    align-items: center;
    flex-direction: column-reverse;
    padding: 24px 27px;
  }
`
);

const ImageWrapper = styled.div(
  ({ theme }) => `
  border-radius: 50%;
  height: 120px;
  overflow: hidden;
  position: absolute;
  left: 40px;
  top: -60px;

  ${theme.down(theme.breakpoints.sm)} {
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 120px;
  }
`
);

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
`;

// const Edit = styled.div`
// margin-left: 17px;
// `;

const Info = styled.div(
  ({ theme }) => `
${theme.down(theme.breakpoints.sm)} {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-top: 55px;
    margin-bottom: 15px;
  }
`
);

const UserName = styled.h3(
  ({ theme }) => `
  color: ${theme.colors.primary};
  font: ${theme.fonts.h3("bold")};
  margin: 0 0 8px;
`
);

const BiddingScore = styled.div(
  ({ theme }) => `
  align-items: center;
  background-color: ${theme.colors.secondary};
  border-radius: ${theme.borderRadius.small};
  color: ${theme.colors.background};
  display: flex;
  font: ${theme.fonts.small()};
  height: 24px;
  padding: 0 8px;
  width: fit-content;
`
);

const Score = styled.div`
  font-weight: bold;
`;

const Bids = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 76px 0;
  text-align: center;
`;

const BidsTitle = styled.h3(
  ({ theme }) => `
  color: ${theme.colors.primary};
  font: ${theme.fonts.h3("bold")};
  margin-bottom: 50px;
`
);

const Grid = styled.div(
  ({ theme }) => `
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 -12px;
  max-width: 1600px;
  width: 100%;

  ${theme.down(theme.breakpoints.md)} {
    display: block;
  }
`
);

const DummyView = styled.div`
  width: 432px;
  margin: 0 12px;
`;

const Placeholder = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 190px;
`;

const PlaceholderText = styled.span(
  ({ theme }) => `
    font: ${theme.fonts.h3()};
    margin-bottom: 58px;
`
);

const Profile: NextPage = () => {
  const { logout, user } = useAuth0();
  const [getData, { data: profile }] = useLazyMojito(EMojitoQueries.profile, {
    variables: {
      organizationID: config.ORGANIZATION_ID,
    },
  });

  useFetchAfterAuth(getData);

  const { lots } = Content;

  if (!profile) return null;
  const activeBids = profile.me.activeBids;
  const userPictureBetterQuality = user?.picture?.replace(
    "_normal",
    "_400x400"
  );
  return (
    <Main>
      {user && (
        <>
          <TopContainer>
            <User>
              <ImageWrapper>
                <Image
                  src={
                    userPictureBetterQuality ||
                    "/images/profile-placeholder.svg"
                  }
                  alt="user"
                  width={120}
                  height={120}
                />
              </ImageWrapper>
              <ButtonsContainer>
                <Button
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  LOG OUT
                </Button>
                {/* <Edit>
            <Button onClick={() => {}}>
              EDIT
            </Button>
            </Edit> */}
              </ButtonsContainer>
              <Info>
                <UserName>{user.name}</UserName>
                <BiddingScore>
                  Bidding score:&nbsp;<Score>{activeBids.length}</Score>
                </BiddingScore>
              </Info>
            </User>
          </TopContainer>
          <Bids>
            {!!activeBids.length ? (
              <>
                <BidsTitle>MY ACTIVE BIDS</BidsTitle>
                <Grid>
                  {activeBids.map((bid: any) => {
                    const lot = lots.find(
                      (item: any) =>
                        item.mojitoId === bid.marketplaceAuctionLot.id
                    );
                    return <ActiveBidtem key={lot?.mojitoId} lotData={lot} />;
                  })}
                  <DummyView />
                  <DummyView />
                </Grid>
              </>
            ) : (
              <Placeholder>
                <PlaceholderText>
                  {"You don't have any bids going on now"}
                </PlaceholderText>
                <Link href="/">
                  <a>
                    <Button>GET STARTED</Button>
                  </a>
                </Link>
              </Placeholder>
            )}
          </Bids>
        </>
      )}
    </Main>
  );
};

export default withAuthenticationRequired(Profile);
