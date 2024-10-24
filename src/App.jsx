import { Link, Redirect, Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import Header from "@/components/Header";
import Overview from "@/content/Overview";
import { cn } from "@/lib/utils";
import Results from "./content/Results";

import logo from "/logo.webp";

function App() {
  return (
    <Router hook={useHashLocation}>
      <Header />
      <main
        className="flex-1 border-b border-zinc-800 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${logo})`,
        }}
      >
        <div className="absolute inset-0 bg-zinc-950/90 backdrop-blur-md"></div>
        <div className="container flex-1 items-start grid grid:cols-1 lg:grid-cols-[240px_1fr] gap-10 relative">
          <aside className="h-[calc(100vh-3.5rem)] hidden lg:block sticky w-full py-8 pr-6 shrink-0 top-14">
            <div className="grid grid-flow-row text-sm">
              <Link
                href="/overview"
                className={(active) =>
                  cn(
                    "w-full py-1 hover:underline text-zinc-400",
                    active && "font-medium text-zinc-200"
                  )
                }
              >
                Overview
              </Link>
              <Link
                href="/results"
                className={(active) =>
                  cn(
                    "w-full py-1 hover:underline text-zinc-400",
                    active && "font-medium text-zinc-200"
                  )
                }
              >
                Research Results
              </Link>
            </div>
          </aside>
          <main className="py-8">
            <Switch>
              <Route path="/overview" component={Overview} />
              <Route path="/results" component={Results} />
              <Route path="/">
                <Redirect to="/overview" />
              </Route>
              <Route>404</Route>
            </Switch>
          </main>
        </div>
      </main>
      <footer className="container flex flex-row justify-start h-24 text-zinc-400 items-center text-sm">
        Created by [Team MDS 16] © 2024
      </footer>
      <div className="sticky bottom-0 z-50 flex flex-row justify-center items-center h-14 bg-zinc-950/90 backdrop-blur-md border-t border-t-zinc-600 lg:hidden">
        <Link
          href="/overview"
          className={(active) =>
            cn(
              "flex-1 h-full text-zinc-400 grid place-items-center border-r border-r-zinc-600",
              active && "font-medium text-zinc-200"
            )
          }
        >
          Research Overview
        </Link>
        <Link
          href="/results"
          className={(active) =>
            cn(
              "flex-1 h-full text-zinc-400 grid place-items-center",
              active && "font-medium text-zinc-200"
            )
          }
        >
          Experimental Results
        </Link>
      </div>
    </Router>
  );
}

export default App;
