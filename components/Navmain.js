import Link from 'next/link';
import Image from 'next/image';
import {
  Alignment,
  Button,
  Classes,
  H5,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Switch
} from '@blueprintjs/core';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

// Sign out button
function SignOutButton() {
  return <button onClick={() => signOut(auth)}>Sign Out</button>;
}

// Top navbar
export default function Navmain() {
  const { user, username } = useContext(UserContext);

  return (
    <Navbar>
      <NavbarGroup align={Alignment.LEFT}>
        <Image src="/ambys-color-logo.svg" alt="other" width={80} height={50} />
        {!user && (
          <li>
            <Link href="/enter" passHref>
              <Button className={Classes.MINIMAL} icon="log-in" text="Login" />
            </Link>
          </li>
        )}
        <NavbarHeading className="pl-2"> Ambys Center</NavbarHeading>
        {user && <SignOutButton />}
        <NavbarDivider />
        <Link href="/" passHref>
          <Button className={Classes.MINIMAL} icon="home" text="Home" />
        </Link>

        {user && (
          <Link href="/study" passHref>
            <Button
              className={Classes.MINIMAL}
              icon="projects"
              text="Studies"
            />
          </Link>
        )}
        {user && (
          <Link href="/animals" passHref>
            <Button className={Classes.MINIMAL} icon="tag" text="Animals" />
          </Link>
        )}
        {user && (
          <Button className={Classes.MINIMAL} icon="route" text="Shipping" />
        )}
      </NavbarGroup>
    </Navbar>
  );
}
