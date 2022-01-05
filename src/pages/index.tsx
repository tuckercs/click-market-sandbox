import type { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";

import { LotGridItem } from "@components";
import { useCollection } from "@hooks";
import Content from "metaverso.content.json";

const Container = styled.main`
  background: ${({ theme }) => theme.backgrounds.grid};
  background-size: 100%;
  background-repeat: no-repeat;
  min-height: 100vh;
  padding: 90px 48px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  text-align: center;
`;

const Description = styled.p(
  ({ theme }) => `
  font: ${theme.fonts.body()};
  text-align: center;
`
);

const DescriptionTitle = styled.p(
  ({ theme }) => `
  color: ${theme.colors.background};
  font: ${theme.fonts.body()};
  text-align: center;
`
);

const Subtitle = styled.p(
  ({ theme }) => `
  font: ${theme.fonts.body("bold")};
  margin: 35px 0 120px;
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

const Home: NextPage = () => {
  const { lots } = Content;
  const { collection } = useCollection("metaverso"); // TODO: Remove hardcoding

  const collectionLotsIds = collection?.items?.map((e: any) => e.lot.id) || [];
  let filteredLots = lots.filter((e) => collectionLotsIds.includes(e.mojitoId));

  return (
    <Container>
      <Image src="/images/brand-icon.png" alt="icon" width={24} height={8} />
      <Title>Metaverso NFTs</Title>

      <Description>{`Puerto Rico's home in the metaverse`}</Description>

      <DescriptionTitle>
        Dec 7, 2021 Museo de Arte de Puerto Rico
      </DescriptionTitle>

      <Subtitle>metaver.so</Subtitle>

      <Grid>
        {filteredLots.map((lot) => {
          const item = collection?.items.find(
            (item: any) => item.lot.id === lot.mojitoId
          );
          return lot ? (
            <LotGridItem
              key={lot.mojitoId + JSON.stringify(item.lot.bidView)}
              mojitoLotData={item.lot}
              lot={lot}
            />
          ) : null;
        })}
        <DummyView />
        <DummyView />
      </Grid>
    </Container>
  );
};

export default Home;
