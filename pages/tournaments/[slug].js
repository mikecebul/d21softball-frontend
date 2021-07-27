import Head from "next/head";
import Image from "next/image";

import { fromImageToUrl, API_URL } from "../../utils/urls";
import { twoDecimals } from "../../utils/format";

const Tournament = ({ tournament }) => {
  return (
    <div>
      <Head>
        {tournament.meta_title && <title>{tournament.meta_title}</title>}
        {tournament.meta_description && (
          <meta name="description" content="add {tournament.meta_description}" />
        )}
      </Head>
      <h3>{tournament.name}</h3>
      <Image
        src={fromImageToUrl(tournament.image)}
        alt="tournament Image"
        width={1920}
        height={1080}
      />
      <p>${twoDecimals(tournament.price)}</p>

      <p>{tournament.content}</p>
    </div>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const tournament_res = await fetch(`${API_URL}/tournaments/?slug=${slug}`);
  const found = await tournament_res.json();

  return {
    props: {
      tournament: found[0], //Because the API reponse for filters is an array
    },
  };
}

export async function getStaticPaths() {
  //Retrieve all the possible paths
  const tournaments_res = await fetch(`${API_URL}/tournaments/`);
  const tournaments = await tournaments_res.json();

  //Return them to NextJS context
  return {
    paths: tournaments.map((tournament) => ({
      params: { slug: String(tournament.slug) },
    })),
    fallback: false, //Tells to nextjs to show a 404 if a param is not matched
  };
}

export default Tournament;
