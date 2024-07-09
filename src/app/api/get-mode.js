

import { getMode } from "@/@core/utils/serverHelpers";

export default function handler(req, res) {
  const mode = getMode();

  res.status(200).json({ mode });
}
