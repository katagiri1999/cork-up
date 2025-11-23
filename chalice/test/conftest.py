import json
import logging

_logger = logging.getLogger('Logger')
_logger.setLevel(logging.INFO)
_console_handler = logging.StreamHandler()
_formatter = logging.Formatter('[%(levelname)s][%(filename)s:%(lineno)d] %(message)s')
_console_handler.setFormatter(_formatter)
_logger.addHandler(_console_handler)

def logger(x):
    res = json.dumps(x, indent=2, ensure_ascii=False)
    _logger.info(res, stacklevel=2)
