import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const LICENSE_FILE_PATTERN = /^(?:licen[cs]e|copying|notice)(?:[-_.].*)?$/i;
const DEPENDENCY_GRAPH_URL =
  "https://github.com/s-hirano-ist/s-public/network/dependencies";
const fallbackNotices = [
  {
    name: "react-remove-scroll-bar",
    version: "2.3.8",
    source: "https://github.com/theKashey/react-remove-scroll-bar",
    notices: [
      `MIT License

Copyright (c) 2017 Anton Korzunov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
    ],
  },
];

const externalNotices = [
  {
    name: "Noto Sans JP",
    version: "Fontsource latest",
    source: "https://fontsource.org/fonts/noto-sans-jp",
    notices: [
      `Google Inc.

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://openfontlicense.org/

SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created using
the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.`,
    ],
  },
  {
    name: "swiper",
    version: "12.2.0",
    source: "https://cdn.jsdelivr.net/npm/swiper@12.2.0/",
    notices: [
      `The MIT License (MIT)

Copyright (c) 2019 Vladimir Kharlampidi

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`,
    ],
  },
];

function packageRootFromModuleId(moduleId) {
  const cleanId = moduleId.split("?", 1)[0].replaceAll("\\", "/");
  const marker = "/node_modules/";
  const markerIndex = cleanId.lastIndexOf(marker);

  if (markerIndex === -1) return undefined;

  const dependencyPath = cleanId.slice(markerIndex + marker.length);
  const segments = dependencyPath.split("/");
  const packageSegments = segments[0].startsWith("@")
    ? segments.slice(0, 2)
    : segments.slice(0, 1);

  if (packageSegments.some(segment => !segment)) return undefined;

  return path.join(
    cleanId.slice(0, markerIndex + marker.length),
    ...packageSegments,
  );
}

async function readPackageNotice(packageRoot) {
  const packageJson = JSON.parse(
    await readFile(path.join(packageRoot, "package.json"), "utf8"),
  );
  const entries = await readdir(packageRoot, { withFileTypes: true });
  const licenseFiles = entries
    .filter(entry => entry.isFile() && LICENSE_FILE_PATTERN.test(entry.name))
    .map(entry => entry.name)
    .sort((a, b) => a.localeCompare(b));

  if (licenseFiles.length === 0) {
    const fallback = fallbackNotices.find(
      notice =>
        notice.name === packageJson.name &&
        notice.version === packageJson.version,
    );
    if (fallback) return fallback;

    throw new Error(
      `No LICENSE, COPYING, or NOTICE file found for browser dependency ${packageJson.name}@${packageJson.version}`,
    );
  }

  return {
    name: packageJson.name,
    version: packageJson.version,
    source: packageJson.homepage ?? packageJson.repository?.url,
    notices: await Promise.all(
      licenseFiles.map(file => readFile(path.join(packageRoot, file), "utf8")),
    ),
  };
}

function renderNotice(packages) {
  const separator = "=".repeat(80);
  const sections = packages.map(pkg => {
    const source = pkg.source ? `\nSource: ${pkg.source}` : "";
    return `${separator}\n${pkg.name}@${pkg.version}${source}\n${separator}\n\n${pkg.notices
      .map(notice => notice.trim())
      .join("\n\n")}`;
  });

  return `THIRD-PARTY SOFTWARE NOTICES

This file contains notices for third-party software delivered to browsers by
https://s-hirano.com/. It is generated from the production client build.

Dependency graph: ${DEPENDENCY_GRAPH_URL}

${sections.join("\n\n")}\n`;
}

export function thirdPartyNotices() {
  const browserModuleIds = new Set();

  return {
    name: "third-party-notices",
    apply: "build",
    applyToEnvironment(environment) {
      return environment.name === "client";
    },
    buildStart() {
      browserModuleIds.clear();
    },
    transform(_code, id) {
      if (id.includes("/node_modules/") || id.includes("\\node_modules\\")) {
        browserModuleIds.add(id);
      }
    },
    async generateBundle() {
      const packageRoots = new Set(
        [...browserModuleIds]
          .map(packageRootFromModuleId)
          .filter(packageRoot => packageRoot !== undefined),
      );
      const packageResults = await Promise.allSettled(
        [...packageRoots].map(readPackageNotice),
      );
      const failures = packageResults.filter(
        result => result.status === "rejected",
      );

      if (failures.length > 0) {
        throw new Error(
          failures
            .map(result =>
              result.reason instanceof Error
                ? result.reason.message
                : String(result.reason),
            )
            .join("\n"),
        );
      }

      const packages = packageResults.map(result => result.value);
      const deduplicatedPackages = new Map();

      for (const pkg of [...packages, ...externalNotices]) {
        deduplicatedPackages.set(`${pkg.name}@${pkg.version}`, pkg);
      }

      this.emitFile({
        type: "asset",
        fileName: "THIRD_PARTY_NOTICES.txt",
        source: renderNotice(
          [...deduplicatedPackages.values()].sort((a, b) =>
            `${a.name}@${a.version}`.localeCompare(`${b.name}@${b.version}`),
          ),
        ),
      });
    },
  };
}
