import { useState, useEffect } from "react";
import { injected } from "./../components/wallet/connectors";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { formatEther } from "@ethersproject/units";

export default function Home() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connect(connector) {
    try {
      await activate(connector);
    } catch (err) {
      console.log(err);
    }
  }

  async function disconnect() {
    try {
      await deactivate();
    } catch (err) {
      console.log(err);
    }
  }

  function Balance() {
    const { account, library, chainId } = useWeb3React();

    const [balance, setBalance] = useState();
    useEffect(() => {
      if (!!account && !!library) {
        let stale = false;

        library
          .getBalance(account)
          .then((balance) => {
            if (!stale) {
              setBalance(balance);
            }
          })
          .catch(() => {
            if (!stale) {
              setBalance(null);
            }
          });

        return () => {
          stale = true;
          setBalance(undefined);
        };
      }
    }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

    return (
      <>
        <span>Balance</span>
        <span role="img" aria-label="gold">
          💰
        </span>
        <span>
          {balance === null
            ? "Error"
            : balance
            ? `Ξ${formatEther(balance)}`
            : ""}
        </span>
      </>
    );
  }

  return (
    <div className="flex justify-center align-middle mt-10">
      <button
        onClick={() => activate(injected)}
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Connect to metamask
      </button>
      {/*       <button
        onClick={() => connect(walletConnect)}
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Connect to walletConnect
      </button> */}
      {active ? <Balance /> : <span>Not connected</span>}

      <button
        onClick={disconnect}
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Disconnect
      </button>
    </div>
  );
}
